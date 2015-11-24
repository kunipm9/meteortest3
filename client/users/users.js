AutoForm.addHooks('insert_user', {
	formToDoc: function(doc) {
console.log("insert_user formToDoc");
console.log(doc);
		if (doc.profile === undefined) return doc;
		if (doc.profile.username === undefined) return doc;
		if (doc.profile.email === undefined) return doc;
		doc.username = doc.profile.username;
		doc.emails = [{address: doc.profile.email, verified: false}];
console.log("insert_user formToDoc after");
console.log(doc);
		return doc;
	},
	onSuccess: function(formType, result) {
console.log("onSuccess");
console.log(formType);
	},
	onError: function(formType, result) {
console.log("onError");
console.log(result);

		//Schemas_User.namedContext("insert_user").addInvalidKeys([{name: 'profile.email', type: 'notUnique'}]);

		if (result.reason && result.reason === 'Username already exists.' ) {
			AutoForm.getValidationContext('insert_user').addInvalidKeys([{name: 'profile.username', type: 'notUnique'}]);
		}

		if (result.reason && result.reason === 'Email already exists.' ) {
			AutoForm.getValidationContext('insert_user').addInvalidKeys([{name: 'profile.email', type: 'notUnique'}]);
		}

	},
}, true);

AutoForm.addHooks('update_user', {
	formToDoc: function(doc) {
console.log("update_user formToDoc");
console.log(doc);
		if (doc.profile === undefined) return doc;
		if (doc.profile.username === undefined) return doc;
		if (doc.profile.email === undefined) return doc;
		doc.username = doc.profile.username;
		doc.emails = [{address: doc.profile.email, verified: false}];
console.log("update_user formToDoc after");
console.log(doc);
		return doc;
	},
	onSuccess: function(formType, result) {
console.log("onSuccess");
console.log(formType);
	},
	onError: function(formType, result) {
console.log("onError");
console.log(result);
		if (result.error && result.error === 'Username already exists.' ) {
console.log("onError update_user");
			AutoForm.getValidationContext('update_user').addInvalidKeys([{name: 'profile.username', type: 'notUnique'}]);
		}

		if (result.error && result.error === 'Email already exists.' ) {
			AutoForm.getValidationContext('update_user').addInvalidKeys([{name: 'profile.email', type: 'notUnique'}]);
		}
	},
}, true);

