var Drawer = require('guy.mcdooooo.tibezier'),
    POP    = require('guy.mcdooooo.tipop'),

    LTAG   = '[BEZIER]',
    M_PI   = 180,
    M_PI_2 = 90,
    M_PI_4 = 45,

    showsMenu = false;


(function constructor() {

	'use strict';


	var saved = false;

	// open a single window
	var win = Ti.UI.createWindow({

		title:           'Ti.Bezier',
		backgroundColor: '#4169E1',
		barColor:        'white',
		backButtonTitle: 'Back',
		navBarHidden:    false
	});


	$.addTopLevelView(win);


	var buttonWrapper, top, middle, bottom,
	    width = 18,
	    height = 16,
	    topYPosition = 7,
	    middleYPosition = 12,
	    bottomYPosition = 17;


	buttonWrapper = Ti.UI.createView({

		width:           18,
		height:          26
//		borderColor:     'white',
//		borderWidth:     1
	});


	top = Drawer.createView({

		width: width,
		height: 2,
		top: topYPosition,

		backgroundColor: 'transparent',
//		backgroundColor: '#ffffff',
//		borderRadius: 3,
//		borderWidth: 1,
//		borderColor: "#ffffff",

		bezier: {

			lineWidth: 2,

			miterLimit: 4,

			strokeColor: '#ffffff',

			strokeEnd: 1.0,

			fill: true,
			fillColor: '#ffffff',

			paths: [{
				draw: 'moveToPoint',
				point: [0, 0]
			}, {
				draw: 'addLineToPoint',
				point: [width, 0]
			}]
		}
	});


    middle = Drawer.createView({

	    width: width,
	    height: 2,
	    top: middleYPosition,

	    backgroundColor: 'transparent',
//	    backgroundColor: '#ffffff',
//	    borderRadius: 3,
//	    borderWidth: 1,
//	    borderColor: "#ffffff"

	    bezier: {

		    lineWidth: 2,

		    miterLimit: 4,

		    strokeColor: '#ffffff',

		    strokeEnd: 1.0,

		    fill:      true,
		    fillColor: '#ffffff',

		    paths: [{
			    draw:  'moveToPoint',
			    point: [0, 0]
		    }, {
			    draw:  'addLineToPoint',
			    point: [width, 0]
		    }]
	    }
    });


    bottom = Drawer.createView({

	    width: width,
	    height: 2,
	    top: bottomYPosition,

	    backgroundColor: 'transparent',
//	    backgroundColor: '#ffffff',
//	    borderRadius: 3,
//	    borderWidth: 1,
//	    borderColor: "#ffffff"

	    bezier: {

		    lineWidth: 2,

		    miterLimit: 4,

		    strokeColor: '#ffffff',

		    strokeEnd: 1.0,

		    fill:      true,
		    fillColor: '#ffffff',

		    paths: [{
			    draw:  'moveToPoint',
			    point: [0, 0]
		    }, {
			    draw:  'addLineToPoint',
			    point: [width, 0]
		    }]
	    }
    });


	buttonWrapper.add(top);
	buttonWrapper.add(middle);
	buttonWrapper.add(bottom);


	buttonWrapper.addEventListener('click', function(event) {

		Ti.API.debug(LTAG, 'ButtonWrapper clicked');


		var duration = 400,
		    strokeStart = (showsMenu ? 0.0 : 0.3),
		    verticalOffsetInRotatedState = 1.25;


		POP.basic(top, {

			duration: duration,
			rotate: {
				z: (showsMenu ? 0 : M_PI + M_PI_4)
			},
			top: (showsMenu ? topYPosition : bottomYPosition + verticalOffsetInRotatedState),
			strokeStart: strokeStart,
			easing: 'easeOutQuad'
		});

		POP.basic(middle, {

			duration: duration,
			rotate: {
				z: (showsMenu ? 0 : M_PI)
			},
			strokeEnd: (showsMenu ? 1.0 : 0.85),
			easing: 'easeOutQuad'
		});

		POP.basic(bottom, {

			duration: duration,
			rotate: {
				z: (showsMenu ? 0 : M_PI_2 + M_PI_4)
			},
			top: (showsMenu ? bottomYPosition : topYPosition - verticalOffsetInRotatedState),
			strokeStart: strokeStart,
			easing: 'easeOutQuad'
		});


		showsMenu = !showsMenu;
	});


	win.add( buttonWrapper );


	return;

})(arguments[0] || {});
