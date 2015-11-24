Router.route('/tasks', {
	name: 'menu.tasks',
	template: 'tasks',
	parent: 'menu',
	title: 'tasks',
	waitOn: function () {
		return [Meteor.subscribe('tasks'), Meteor.subscribe('tasklists')];
	},
	onBeforeAction: function (pause) {
		if (!Meteor.user()) {
			Router.go('login');
		}
		this.next();
	},
});
