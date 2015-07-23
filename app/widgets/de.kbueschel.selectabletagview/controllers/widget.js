var LTAG        = '[SelectableTagViewWidget]',
    POP         = require('guy.mcdooooo.tipop'),

    _circleView = null,
    _checkView  = null,

    _defaults   = {

	    isSelectable: true,
	    checked:      false,

	    activeBackgroundColor: '#45b961',
	    backgroundColor:       '#e5e5e5',

	    activeColor: '#ffffff',
	    color:       '#ababab',

	    text: ''
    };


/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';


	// set defaults
	_.defaults(args, _defaults);


	// expose properties as "private" vars
	var StringUtils = require('alloy/string');


	_.each(Object.keys(_defaults), function(value, key) {

		Object.defineProperty($, ('_' + StringUtils.lcfirst(value)), {

			value:        args[value],
			writable:     true,
			configurable: false
		});

		delete args[value];

		return;
	});


	// create views and apply args
	$.container.applyProperties(_.omit(args, 'id', '__parentSymbol', '__itemTemplate', '$model'));

	$.container.setBackgroundColor($._backgroundColor);


	$.tag.applyProperties({

		color: $._color,
		text:  $._text
	});


	var Drawer = require('guy.mcdooooo.tibezier');


	_circleView = Drawer.createView({

		width:  20,
		height: 20,

		backgroundColor: 'transparent',
		borderWidth:     2,
		borderColor:     $._color,
		borderRadius:    10
	});


	_checkView = Drawer.createView({

		width:  35,
		height: 37,

		backgroundColor: 'transparent',

		bezier: {

			lineWidth:  3,
			miterLimit: 4,

			strokeColor: $._activeColor,
			strokeEnd:   0.0,
			fillColor:   'transparent',

			paths: [{

				draw:  'moveToPoint',
				point: [9, 17.5]
			},
				{

					draw:  'addLineToPoint',
					point: [14.5, 22.5]
				},
				{

					draw:  'addLineToPoint',
					point: [24.5, 13]
				}
			]
		}
	});


	$.iconContainer.add(_circleView);
	$.iconContainer.add(_checkView);


	// change initial state if needed
	if (!!$._checked) {

		_check(true);
	}


	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});


/**
 * Change to state checked
 *
 * @private
 * @param {Bool} immediately
 * @returns void
 */
function _check(immediately) {

	'use strict';


	if ($._checked) {

		return;
	}


	$.container.setBackgroundColor($._activeBackgroundColor);
	$.tag.setColor($._activeColor);


	POP
		.basic(_circleView, {

			width:  10,
			height: 10,

			borderRadius: 5,
			opacity:      0.0,

			duration: 0
		});

	POP
		.basic(_checkView, {

			strokeEnd: 1.0,
			duration:  (immediately ? 0 : 400)
		});


	$._checked = true;


	return;

} // END _check()


/**
 * Change to state unchecked
 *
 * @private
 * @param {Bool} immediately
 * @returns void
 */
function _uncheck(immediately) {

	'use strict';


	if (!$._checked) {

		return;
	}


	$.container.setBackgroundColor($._backgroundColor);
	$.tag.setColor($._color);


	POP
		.basic(_circleView, {

			width:  20,
			height: 20,

			borderRadius: 10,
			opacity:      1.0,

			duration: (immediately ? 0 : 400)
		});

	POP
		.basic(_checkView, {

			strokeEnd: 0.0,
			duration:  0
		});


	$._checked = false;


	return;

} // END _uncheck()


/**
 * Toggles checked state
 *
 * @private
 * @param {Object} event
 * @returns void
 */
function toggle(event) {

	$._checked ? _uncheck() : _check();


	$.trigger('stateChange', {

		checked: $._checked
	});


	return;

} // END toggle()