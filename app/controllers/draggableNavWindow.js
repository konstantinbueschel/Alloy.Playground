var args = arguments[0] || {};


/**
 * Description
 *
 * @method _eventCallback
 * @param event
 * @private
 * @return void
 */
function _eventCallback(event) {

	// DEBUG
	Ti.API.debug('draggableNavWindow::_eventCallback()::event =', event, '\n');


	return;

} // END _eventCallback()


var Draggable = require('ti.draggable'),
    navWindow = Draggable.createNavigationWindow({

	    width:  Ti.Platform.getDisplayCaps().platformWidth,
	    height: Ti.Platform.getDisplayCaps().platformHeight,

	    window: Ti.UI.createWindow({

		    title:    'DraggableNavWindow',
		    barColor: '#cdce00',

		    titleAttributes: {

			    color: 'white'
		    },

		    backgroundColor: 'blue'
	    }),

	    draggableConfig: {

		    enabled:            true,
		    enabledOnLongpress: false,
		    showShadowOnMove:   true
	    }
    });


navWindow.addEventListener('start', _eventCallback);
navWindow.addEventListener('move', _eventCallback);
navWindow.addEventListener('cancel', _eventCallback);
navWindow.addEventListener('end', _eventCallback);


$.addTopLevelView(navWindow);