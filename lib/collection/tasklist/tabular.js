TabularTables.TaskList = new Tabular.Table({
	name: "TaskList",
	collection: TaskList,
	pub: "tabular_tasklist",
	columns: [{
		data: "title",
		title: "Task List"
	}, {
		data: "userId",
		visible: false
	}, {
		data: "user",
		title: "User"
	}, {
		data: "role",
		title: "Role"
	}, {
		tmpl: Meteor.isClient && Template.operation_tasklist
	}]
});


if (Meteor.isServer) {

Meteor.publish('tabular_tasklist', function(tableName, ids, fields) {
	check(tableName, String);
	check(ids, [String]);
	check(fields, Match.Optional(Object));
	/*
	if (!Roles.userIsInRole(this.userId, 'admin')) {
		return [];
	}
	*/
	Publish.relations(this, TaskList.find({
		_id: {
			$in: ids
		}
	}, {
		fields: fields
	}), function(id, doc) {
		var role = '';
		doc.user = this.changeParentDoc(Meteor.users.find({
			_id: doc.userId
		}), function(id, doc) {
			var fullname = doc.profile.firstName + " " + doc.profile.lastName;
			role = doc.profile.role;
			return fullname;
		}, 'user');
		//doc.role = Roles.getRolesForUser(doc.userId)[0];
		doc.role = role;
	});
	return this.ready();
});

}
