var args = arguments[0] || {};


function _onSelection(event) {

	var row = event.source,
	    controller = Alloy.createController(row.controller);


	if (OS_IOS && !row.openStandalone && !row.openModal) {

		$.navigator.openWindow(controller.getView());
	}
	else if (row.openModal === true) {

		controller.getView().open({

			modal:                true,
			animated:             true,
			modalStyle:           T.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT,
			modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE
		});
	}
	else {

		controller.getView().open();
	}


	return;

} // END _onSelection()


$.navigator.open();