import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-input-mask', 'Integration | Component | paper input mask', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-input-mask onChange=null}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-input-mask onChange=null}}
      template block text
    {{/paper-input-mask}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
