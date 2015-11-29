Schemas_UserProfile = new SimpleSchema({
	firstName: {
		type: String,
		label: 'First Name',
		regEx: /^[a-zA-Z-]{2,25}$/,
		optional: true,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	lastName: {
		type: String,
		label: 'Last Name',
		regEx: /^[a-zA-Z]{2,25}$/,
		defaultValue: "EditProfile",
		optional: true,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	password: {
		type: String,
		label: 'Password',
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	username: {
		type: String,
		label: 'Username',
		unique: true,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	email: {
		type: String,
		label: 'Email',
		regEx: SimpleSchema.RegEx.Email,
		unique: true,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
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
			},
			afFormGroup: _AF_FORMGROUP,
		}
	}
});

Schemas_User = new SimpleSchema({
	username: {
		type: String,
		label: 'Username',
		regEx: /^[a-z0-9A-Z_]{3,15}$/,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	emails: {
		type: [Object],
		label: 'Email',
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	profile: {
		type: Schemas_UserProfile,
		optional: true,
	},
	"emails.$.address": {
		type: String,
		label: 'Email',
		regEx: SimpleSchema.RegEx.Email,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	"emails.$.verified": {
		type: Boolean,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	createdAt: {
		type: Date,
		autoform: {
			type: "pika-datepicker",
			afFormGroup: _AF_FORMGROUP,
		}
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	roles: {
		type: Object,
		label: 'Role',
		blackbox: true,
		optional: true,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
});

Meteor.users.attachSchema(Schemas_User);

