Template.root.events({
	'click a.logout': function() {
		Meteor.logout(function() {
			Router.go('/login');
		});
		return;
	},
});

Template.navbar.helpers({
	procMonthString: function() {
console.log("Template.root.helpers");
console.log(Session.get('procMonthString'));
		return Session.get('procMonthString');
	},
});

console.log("root google -----------------------------------------------");
GoogleMaps.load({
	libraries: 'places'
});

