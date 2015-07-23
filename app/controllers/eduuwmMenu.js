var args = arguments[0] || {};

var items = [{

	id: 1,
	title: 'NavBarItem #1'

}, {

	id: 2,
	title: 'NavBarItem #2'
}, {

	id: 3,
	title: 'NavBarItem #3'
}, {

	id: 4,
	title: 'NavBarItem #4'

}, {

	id: 5,
	title: 'NavBarItem #5'
}];


var menu = Alloy.createWidget('edu.uwm.menu', {

	items: items
});


$.window.add(menu);