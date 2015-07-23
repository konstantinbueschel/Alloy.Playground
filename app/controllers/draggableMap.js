var args       = arguments[0] || {},
    Draggable  = require('ti.draggable'),
    childWidth = (Ti.Platform.displayCaps.platformWidth * 0.25),
    parentView, childView;


function _eventCallback(e) {

	// DEBUG
	Ti.API.info(e);

	return;

} // END _eventCallback()


childView = Ti.UI.createView({
	//childView = Draggable.createView({

	width:  childWidth,
	height: Ti.UI.FILL,

	top:   0,
	//	left: (childWidth * -1),
	right: 0,

	backgroundColor: ('#' + Math.floor(Math.random() * 16777215).toString(16)),

	/*draggableConfig: {

	 axis:             'x',
	 enabled:          true,
	 translateOnlyMap: false,
	 showShadowOnMove: false
	 }*/
});

/*
 parentView = Draggable.createView({

 width:  '25%',
 height: '25%',

 top:  0,
 left: '35%',

 draggableConfig: {

 enabled:          false,
 translateOnlyMap: true,
 showShadowOnMove: true,

 maps: [{

 view:           childView,
 parallaxAmount: 1
 }]
 },

 backgroundColor: ('#' + Math.floor(Math.random() * 16777215).toString(16))
 });
 */


parentView = Draggable.createWindow({
	//parentView = Ti.UI.createWindow({

	draggableConfig: {

		axis:             'x',
		enabled:          true,
		translateOnlyMap: false,
		showShadowOnMove: false

		/*maps: [{

			view:           childView,
			parallaxAmount: 1,
			constrain:      {

				axis: 'x',
				x:    {

					start:    (childWidth * -1),
					end:      (childWidth / 2),
					callback: _eventCallback
				}
			}
		}]*/
	},

	backgroundColor: ('#' + Math.floor(Math.random() * 16777215).toString(16))
});


parentView.add(childView);


$.addTopLevelView(parentView);


// events
parentView.addEventListener('start', _eventCallback);
parentView.addEventListener('end', _eventCallback);
parentView.addEventListener('move', _eventCallback);
parentView.addEventListener('cancel', _eventCallback);


/*
 childView = Draggable.createView({

 width: '25%',
 height: '25%',

 top: 0,
 left: 25,

 draggableConfig: {

 enabled: false,
 showShadowOnMove: true
 },

 backgroundColor: ('#' + Math.floor(Math.random() * 16777215).toString(16))
 });


 // events
 childView.addEventListener('start', _eventCallback);
 childView.addEventListener('end', _eventCallback);
 childView.addEventListener('move', _eventCallback);
 childView.addEventListener('cancel', _eventCallback);


 $.window.add(childView);
 */