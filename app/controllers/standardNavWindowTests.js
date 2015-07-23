var args = arguments[0] || {};


/**
 * Description
 *
 * @param event
 * @private
 * @method _eventCallback
 * @return void
 */
function _eventCallback(event) {

	// DEBUG
	Ti.API.debug('standardNavWindowTests::_eventCallback():event =', event);


	return;

} // END _eventCallback()


/**
 * Description
 *
 * @method _changeRoot
 * @param event
 * @private
 * @return void
 */
function _changeRoot(event) {

	var button = event.source;

	button.setTouchEnabled(false);


	$.navWindow.setWindow(Ti.UI.createWindow({

		title:           'New Root',
		barColor:        'blue',
		backgroundColor: 'white',

		titleAttributes: {

			color: 'white'
		}
	}));


	setTimeout(function() {

		button.setTouchEnabled(true);
		button = null;

	}, 1000);


	return;

} // END _changeRoot()


$.navWindow.addEventListener('touchstart', _eventCallback);
$.navWindow.addEventListener('touchmove', _eventCallback);
$.navWindow.addEventListener('touchend', _eventCallback);
$.navWindow.addEventListener('touchcancel', _eventCallback);