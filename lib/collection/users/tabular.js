TabularTables.UserList = new Tabular.Table({
	name: "UserList",
	collection: Meteor.users,
	pub: "users",
	responsive: true,
	autoWidth: false,
	stateSave: true,
	sDom: 'frtlp',
	columns: [{
		data: "profile",
		title: "First Name",
		render: function(val, type, doc) {
			return val.firstName;
		}
	}, {
		data: "profile",
		title: "Last Name",
		render: function(val, type, doc) {
			return val.lastName;
		}
	}, {
		data: "profile",
		title: "Role",
		render: function(val, type, doc) {
			return val.role;
		}
	}, {
		tmpl: Meteor.isClient && Template.operation_user
	}]
});
