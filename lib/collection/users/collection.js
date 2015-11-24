Schemas_UserProfile = new SimpleSchema({
	firstName: {
		type: String,
		label: 'First Name',
		regEx: /^[a-zA-Z-]{2,25}$/,
		optional: true
	},
	lastName: {
		type: String,
		label: 'Last Name',
		regEx: /^[a-zA-Z]{2,25}$/,
		defaultValue: "EditProfile",
		optional: true
	},
	password: {
		type: String,
		label: 'Password',
	},
	username: {
		type: String,
		label: 'Username',
		unique: true,
	},
	email: {
		type: String,
		label: 'Email',
		regEx: SimpleSchema.RegEx.Email,
		unique: true,
	},
	role: {
		type: String,
		label: 'Role',
		autoform: {
			type: "select",
			options: function() {
				var option = {
					"client": "client",
					"admin": "admin"
				};
				return option;
			}
		}
	}
});

Schemas_User = new SimpleSchema({
	username: {
		type: String,
		label: 'Username',
		regEx: /^[a-z0-9A-Z_]{3,15}$/
	},
	emails: {
		type: [Object],
		label: 'Email'
	},
	profile: {
		type: Schemas_UserProfile,
		optional: true
	},
	"emails.$.address": {
		type: String,
		label: 'Email',
		regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true
	},
	roles: {
		type: Object,
		label: 'Role',
		blackbox: true,
		optional: true
	},
});

Meteor.users.attachSchema(Schemas_User);

