import Inputmask from 'inputmask';

import { once, next } from '@ember/runloop';

import { computed, observer } from '@ember/object';

import PaperInput from 'ember-paper/components/paper-input';

import layout from 'ember-paper/templates/components/paper-input';

Inputmask.extendAliases({
	date: {
		alias: 'datetime',
		inputFormat: 'yyyy-mm-dd'
	},
	time: {
		alias: 'datetime',
		inputFormat: 'HH:MM:ss'
	},
	datetime: {
		inputFormat: 'yyyy-mm-dd HH:MM:ss'
	}
});

export default PaperInput.extend({
	layout,

	mask: '',

	value: null,
	type: 'text',
	pattern: null,
	maskedValue: null,

	rightAlign: false,
	greedyMask: false,

	showMaskOnFocus: true,
	showMaskOnHover: true,

	getMaskedValue: false,
	clearIncomplete: false,

	options: computed(function() {
		return {};
	}),

	// Initialize the mask by forcing a
	// call to the updateMask function
	didInsertElement() {
		if (this.isDestroyed || this.isDestroying) { return; }

		this._super(...arguments);

		let field = this.element.querySelector('input, textarea');

		this.set('field', field);

		this.notifyPropertyChange('mask');
	},

	// Remove the mask from the input
	willDestroyElement() {
		if (this.isDestroyed || this.isDestroying) { return; }

		this._super(...arguments);

		let element = this.get('field');

		try {
			element
			&& element.inputmask
			&& element.inputmask.remove();
		}
		catch(e) {
			// console.error(e); // eslint-disable-line
		}
	},

	setMask() {
		Inputmask.extendDefinitions({
			'2': { 'validator': '[2-9]' }
		});

		let element = this.get('field');
		if (!element) { return; }

		let mask = this.get('mask');
		let options = this.get('options');

		element && element.inputmask && element.inputmask.remove();
		let inputmask = new Inputmask(mask, options);
		inputmask.mask(element);

		// Initialize the unmasked value if it exists
		let value = this.get('value');
		value && (element.value = value);

		// If the mask has changed, we need to refocus the input to show the
		// proper mask preview. Since the caret is not positioned by the focus
		// even, but the click event, we need to trigger a click as well.
		if (element === document.activeElement) {
			element.blur();
			element.focus();
			element.click();
		}
	},

	// Update the mask whenever the mask itself changes or one of the options changes.
	// This observer is meant to be extensible so that other fields can add options
	// (See `decimal-input`), which is why the actual setting of the mask is handled
	// in another function.
	updateMask() {
		this.get('mask').toLowerCase() === 'regex'
			&& this.set('options.mask', '')
			|| this.set('options.regex',
				this.get('pattern')
				|| this.get('regex')
			);

		this.setProperties({
			'options.prefix': this.get('maskPrefix'),
			'options.greedy': this.get('greedyMask'),
			'options.rightAlign': this.get('rightAlign'),
			'options.placeholder': this.get('maskPlaceholder'),
			'options.showMaskOnFocus': this.get('showMaskOnFocus'),
			'options.showMaskOnHover': this.get('showMaskOnHover'),
			'options.clearIncomplete': this.get('clearIncomplete'),
			'options.digits': this.get('digits'),
			'options.autoGroup': this.get('autoGroup'),
			'options.groupSeparator': this.get('groupSeparator'),
			'options.radixPoint': this.get('radixPoint')
		});

		this.setMask();
	},

	_maskShouldChange: observer( // eslint-disable-line
		'mask',
		'regex',
		'pattern',
		'greedyMask',
		'rightAlign',
		'maskPlaceholder',
		'showMaskOnFocus',
		'showMaskOnHover',
		'clearIncomplete',
		function() {
			once(this, 'updateMask');
		}
	),

	unmaskedValue() {
		let element = this.get('field');

		return element
			&& element.inputmask
			&& element.inputmask.unmaskedvalue();
	},

	setValue(value) {
		if (this.isDestroyed || this.isDestroying) { return; }

		let input = this.get('field');
		let inputValue = input.value;
		let unmaskedValue = this.unmaskedValue();

		![inputValue, unmaskedValue].includes(value)
			&& (input.value = unmaskedValue);
	},

	onChange() { },

	actions: {
		handleInput(e) {
			let element = this.get('field');
			let unmaskedValue = this.unmaskedValue();
			let getMaskedValue = this.get('getMaskedValue');

			// setValue below ensures that the input value is the same as this.value
			next(() => this.setValue(e.target.value));

			this.onChange(getMaskedValue ? e.target.value : unmaskedValue);

			this.growTextarea();
			this.notifyValidityChange();
			this.set('isNativeInvalid', element && element.validity && element.validity.badInput);
		}
	}
});
