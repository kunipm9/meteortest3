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
			},
			afFormGroup: _AF_FORMGROUP,
		}
	},
	title: {
		type: String,
		label: "Title",
		max: 200,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	description: {
		type: String,
		label: "Description",
		max: 200,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	deadline: {
		type: String,
		label: "期限",
		autoform: {
			type: "jquery-weekpicker",
			//type: "pika-datepicker",
			afFormGroup: _AF_FORMGROUP,
		}
	},
	term: {
		type: [Schemas_DateFromTo_F],
		label: "期間",
//		optional: true,
		autoform: {
			//afObjectField: _AF_OBJECTFIELD_STRUCT,
			afArrayField: _AF_ARRAYFIELD,
			fieldLabels: _AF_ARRAYFIELD_LABEL(Schemas_DateFromTo_F),
		}
	},
	entday: {
		type: String,
		label: "日付和暦",
		regEx: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
		optional: true,
		autoform: {
			type: "wareki-ymd",
			afFormGroup: _AF_FORMGROUP,
		}
	},
	location: {
		type: Object,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
			type: 'map',
//			width: '600px',
			height: '500px',
			defaultLat: 35.68239834096679,
			defaultLng: 139.75956916809082,
		},
	},
	'location.lat': {
		type: String,
	},
	'location.lng': {
		type: String
	},
});

TaskList = new Mongo.Collection("taskList");
TaskList.attachSchema(Schemas_TaskList);

