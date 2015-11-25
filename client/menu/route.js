Router.route('/', {
	name: 'menu',
	template: 'menu',
	title: 'menu',
	fastRender: true,
	onBeforeAction: function (pause) {
		if (!Meteor.user()) {
			Router.go('login');
		}
		this.next();
	},
});

