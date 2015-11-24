Router.route('/tasklist', {
	name: 'menu.tasklist',
	template: 'tasklist',
	parent: 'menu',
	title: 'TaskList',
	waitOn: function () {
		return [Meteor.subscribe('tasklists')];
	},
	onBeforeAction: function (pause) {
		if (!Meteor.user()) {
			Router.go('login');
		}
		this.next();
	},
});
