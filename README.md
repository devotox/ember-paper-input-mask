[![Ember Observer Score](http://emberobserver.com/badges/ember-paper-input-mask.svg)](http://emberobserver.com/addons/ember-paper-input-mask)
[![Build Status](https://travis-ci.org/devotox/ember-paper-input-mask.svg)](http://travis-ci.org/devotox/ember-paper-input-mask)
[![Coverage Status](https://codecov.io/gh/devotox/ember-paper-input-mask/branch/master/graph/badge.svg)](https://codecov.io/gh/devotox/ember-paper-input-mask)
[![NPM Version](https://badge.fury.io/js/ember-paper-input-mask.svg)](http://badge.fury.io/js/ember-paper-input-mask)
[![NPM Downloads](https://img.shields.io/npm/dm/ember-paper-input-mask.svg)](https://www.npmjs.org/package/ember-paper-input-mask)
[![Dependency Status](https://david-dm.org/poetic/ember-paper-input-mask.svg)](https://david-dm.org/poetic/ember-paper-input-mask)
[![DevDependency Status](https://david-dm.org/poetic/ember-paper-input-mask/dev-status.svg)](https://david-dm.org/poetic/ember-paper-input-mask#info=devDependencies)
[![Greenkeeper](https://badges.greenkeeper.io/devotox/ember-paper-input-mask.svg)](https://greenkeeper.io/)

ember-paper-input-mask
==============================================================================

Input Mask addon for [Ember Paper](https://github.com/miguelcobain/ember-paper)

[DEMO](https://devotox.github.io/ember-paper-input-mask)

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

Installation
------------------------------------------------------------------------------

```
ember install ember-paper-input-mask
```

Usage
------------------------------------------------------------------------------

```handlebars
{{paper-input-mask mask='currency' value=value onChange=(action (mut value))}}
```

Mask Options: [Input Mask](https://github.com/RobinHerbots/Inputmask)
Paper Input Options: [Ember Paper](https://github.com/miguelcobain/ember-paper)

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
