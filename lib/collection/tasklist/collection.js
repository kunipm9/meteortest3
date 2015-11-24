Schemas_TaskList = new SimpleSchema({
	userId: {
		type: String,
		label: 'User',
		autoform: {
			type: "select",
			options: function() {
				var users = Meteor.users.find().fetch();
				var option = [];
				for (u = 0; u < users.length; u++) {
					var fullname = users[u].profile.firstName + " " + users[u].profile.lastName;
					option.push({
						label: fullname,
						value: users[u]._id
					});
				}
				return option;
			}
		}
	},
	title: {
		type: String,
		label: "Title",
		max: 200
	},
	description: {
		type: String,
		label: "Description",
		max: 200
	}
});

TaskList = new Mongo.Collection("taskList");
TaskList.attachSchema(Schemas_TaskList);

