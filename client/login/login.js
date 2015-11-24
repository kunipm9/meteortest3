//	Session.setDefault('officeName', "aa");

Template.login.events({
	'submit #xyzxyz0' : function(e, t) {
		e.preventDefault();
console.log(t);
		var username = t.find('#xyzxyz').value;
		var password = t.find('#xyzxyz2').value;
		Meteor.loginWithPassword(username, password, function(err) {
			if (Meteor.user()) {
				Router.go('menu');
			} else {
				var message = "There was an error logging in: <strong>" + error.reason + "</strong>";
				template.find('#form-messages').html(message);
			}
		});
		return false; 
	},
});
