Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.registerHelper("log", function(opt) {
	console.log(opt);
});
