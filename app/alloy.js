// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
/*
 (function() {

 var ACS = require('ti.cloud'),
 env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
 username = Ti.App.Properties.getString('acs-username-' + env),
 password = Ti.App.Properties.getString('acs-password-' + env);


 // if not configured, just return
 if (!env || !username || !password) {
 return;
 }


 *//**
 * Appcelerator Cloud (ACS) Admin User Login Logic
 *
 * fires login.success with the user as argument on success
 * fires login.failed with the result as argument on error
 *//*
 ACS.Users.login({

 login:    username,
 password: password

 }, function(result) {

 if (env === 'development') {

 Ti.API.info('ACS Login Results for environment `' + env + '`:');
 Ti.API.info(result);
 }

 if (result && result.success && result.users && result.users.length) {

 Ti.App.fireEvent('login.success', result.users[0], env);
 }
 else {

 Ti.App.fireEvent('login.failed', result, env);
 }
 });

 })();
 */


/**
 * Global Alloy Configuration File
 */

	// Set App Wide constants
Alloy.Globals.settings = {

	ga:           "UA-XXXXXXXX-X",
	iconLovation: "/images/icons/",

	tabs: {
		moreIcon: "more.png"
	},

	colors: {

		primary:   "#333",
		secondary: "#999",
		text:      "#FFF",
		menuText:  "#FFF"
	},

	useMenu: false
};

// Get Device specifics
Alloy.Globals.device = {

	isHandheld:           Alloy.isHandheld,
	isTablet:             Alloy.isTablet,
	type:                 Alloy.isHandheld ? "handheld" : "tablet",
	os:                   null,
	name:                 null,
	version:              Ti.Platform.version,
	versionMajor:         parseInt(Ti.Platform.version.split(".")[0], 10),
	versionMinor:         parseInt(Ti.Platform.version.split(".")[1], 10),
	width:                Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
	height:               Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight,
	dpi:                  Ti.Platform.displayCaps.dpi,
	orientation:          Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT ? "LANDSCAPE" : "PORTRAIT",
	statusBarOrientation: null
};


if (OS_IOS) {

	Alloy.Globals.device.os = "IOS";

	if (Ti.Platform.osname.toUpperCase() == "IPHONE") {

		Alloy.Globals.device.name = "IPHONE";
	}
	else if (Ti.Platform.osname.toUpperCase() == "IPAD") {

		Alloy.Globals.device.name = "IPAD";
	}

}
else if (OS_ANDROID) {

	Alloy.Globals.device.os = "ANDROID";

	Alloy.Globals.device.name = Ti.Platform.model.toUpperCase();

	// Fix the display values
	Alloy.Globals.device.width = (Alloy.Globals.device.width / (Alloy.Globals.device.dpi / 160));
	Alloy.Globals.device.height = (Alloy.Globals.device.height / (Alloy.Globals.device.dpi / 160));

	Alloy.Globals.appArgumentsURL = Ti.Android.currentActivity.intent.data;
}


// Custom Query Styles
Alloy.Globals.isIOS7Plus = (OS_IOS && parseInt(Ti.Platform.version.split(".")[0]) >= 7);
Alloy.Globals.isIOS8Plus = (OS_IOS && parseInt(Ti.Platform.version.split(".")[0]) >= 8);
Alloy.Globals.isAndroid4 = (OS_ANDROID && parseInt(Ti.Platform.version.split(".")[0]) === 4);