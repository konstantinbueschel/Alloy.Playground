var args = arguments[0] || {};

//var Module = require('de.kbueschel.tiextendedwebview');

// DEBUG
//Ti.API.debug('index::Module =', Module);
//Ti.API.debug('index::Module =', Object.keys(Module));
//Ti.API.debug('index::Module =', Module.createExample());


function _reload(event) {

	event.source.touchEnabled = false;


	$.webView.reload();


	setTimeout(function() {

		event.source.touchEnabled = true;

	}, 1000);


	return;
}


function _send(event) {

	var id = event.source.id;


	switch (id) {

		case 'send_openurl_intent':

			Ti.Platform.openURL('intent://view?param1=123&param2=456#Intent;package=de.dieinteraktiven.alloyplayground;scheme=alloyplayground;launchFlags=268435456;end;');

			break;


		case 'send_intent':

			// intent object to launch the application
			var intent = Ti.Android.createIntent({

				action: Ti.Android.ACTION_VIEW,
				data:   'alloyplayground://view?param1=123&param2=456'
			});


			Ti.Android.currentActivity.startActivity(intent);

			break;


		default:

			Ti.Platform.openURL('alloyplayground://view?param1=123&param2=456');

			break;
	}


	return;
}


function _handleWebViewStateChange(event) {

	// DEBUG
	Ti.API.debug('index::_handleWebViewStateChange():event =', event.type, event.url, event);


	//	if (event.type === 'beforeload' && event.url.search('alloyplayground://') != -1) {
	//
	//		event.source.stopLoading(true);
	//	}


	return;
}


function _handleURL(url) {

	var XCallbackURL = require('XCallbackURL'),
	    URL = XCallbackURL.parse(url);


	// DEBUG
	Ti.API.debug('index::_handleURL():Here we go =', URL.action(), OS_ANDROID ? JSON.stringify(URL.params()) : URL.params());


	return;
}


function _onFocus(event) {

	// DEBUG
	Ti.API.debug('index::_onFocus():event =', event.type, event);


	// variable initialization
	var appURL, activity;


	// fetch appURL depend on OS
	if (OS_IOS) {

		appURL = Ti.App.getArguments().url;


		Ti.App.addEventListener('resumed', function(event) {

			// Handle the URL in case it resumed the app
			var appURL = Ti.App.getArguments().url;


			// DEBUG
			Ti.API.debug('index::_onFocus():resumed():appURL =', appURL);


			if (appURL) {

				_handleURL(appURL);
			}
		});
	}
	else if (OS_ANDROID) {

		appURL = Alloy.Globals.appArgumentsURL;


		activity = event.source.activity;

		if (activity) {

			activity.onStart = function(event) {

				// DEBUG
				Ti.API.debug('index::_onFocus():onStart():appURLIntent =', Ti.Android.currentActivity.intent.data);
				Ti.API.debug('index::_onFocus():onStart():appURLGlobals =', Alloy.Globals.appArgumentsURL);


				return;
			};


			activity.onResume = function(event) {

				// DEBUG
				Ti.API.debug('index::_onFocus():onResume():appURLIntent =', Ti.Android.currentActivity.intent.data);
				Ti.API.debug('index::_onFocus():onResume():appURLGlobals =', Alloy.Globals.appArgumentsURL);


				return;
			};
		}
	}


	// DEBUG
	Ti.API.debug('index::_onFocus():appURL =', appURL);


	// Handle the URL in case it opened the app
	if (appURL) {

		_handleURL(appURL);
	}


	return;
}


$.index.open();