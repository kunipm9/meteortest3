//Accounts.onCreateUser(function(info, user) {
//    if(Meteor.users.find().count() == 0){
//        var role = 'admin';
//    }
//    if(info.profile)
//        user.profile = info.profile;
//    else
//        user.profile = {};
//
//    if(info.profile.firstName == undefined)
//        if(info.username)
//            user.profile.firstName = info.username;
//        else
//            user.profile.firstName = info.email;
//
//    user.profile.role = role;
//    return user;
//});
//
//
//Accounts.onLogin(function (info) {
//    if(info.user.roles == undefined || info.user.roles.__global_roles__[0] != info.user.profile.role){
//        Roles.addUsersToRoles(info.user._id, info.user.profile.role, Roles.GLOBAL_GROUP);
//    }
//});


Meteor.methods({
	AccountsCreateUser: function(doc) {
console.log("before AccountsCreateUser check");
console.log(doc);
		check(doc, Schemas_User);
		doc.password = doc.profile.password;
		doc.email = doc.profile.email;

console.log("before Accounts.createUser");
console.log(doc);
		var id = Accounts.createUser(doc);
console.log("after Accounts.createUser");
console.log(id);
		Roles.addUsersToRoles(id, [doc.profile.role], Roles.GLOBAL_GROUP);
		return null;
	},

	AccountsChangeUser: function(doc, _id) {
console.log("before AccountsChangeUser check");
console.log(doc);
		check(doc, Schemas_User);
	//	doc.password = doc.profile.password;
	//	doc.email = doc.profile.email;

		try {
			Meteor.users.update({ _id: _id}, doc);
		} catch (e) {
			console.log(e.name);
			console.log(e.message);
			if (e.message.indexOf("profile.username") > 0) {
				throw new Meteor.Error('Username already exists.');
			}
			if (e.message.indexOf("profile.email") > 0) {
				throw new Meteor.Error('Email already exists.');
			}
		}

console.log("before Accounts.setPassword");
console.log(doc['$set']['profile.password']);
		Accounts.setPassword(_id, doc['$set']['profile.password']);
console.log("after Accounts.setPassword");
		return null;
	},

});
