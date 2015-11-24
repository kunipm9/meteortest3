Router.configure({
	layoutTemplate: 'root',
	loadingTemplate: 'loading',
	//    notfoundTemplate: 'notFound',
	defaultBreadcrumbTitle: 'My Default Title',
	defaultBreadcrumbLastLink: true,
	//onBeforeAction: function (pause) {
	//	if (!Meteor.user()) {
	//		Router.go('login');
	//	}
	//	this.next();
	//},
});
