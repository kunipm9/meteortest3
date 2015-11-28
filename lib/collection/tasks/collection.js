Schemas_Task = new SimpleSchema({
	procMonth: {
		type: String,
		label: "procMonth",
	},
	stickynoteBody: {
		type: Object,
		autoform: {
			type: "jquery-stickynote",
		}
	},
	taskListId: {
		type: String,
		label: 'Task List',
		autoform: {
			type: "select2-add",
			pathFor: "menu.tasklist",
			options: function() {
				return generateSelectOptionsFromCollection(TaskList, {}, 'title', '_id');
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
	stickynoteTask: {
		type: Object,
		autoform: {
			type: "jquery-stickynote",
		}
	},
	task: {
		type: Object,
		label: "タスク情報",
		optional: true,
		autoform: {
			afObjectField: _AF_OBJECTFIELD_FIELDSET,
		}
	},
	'task.task_title': {
		type: String,
		label: "タスク名",
		optional: true,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	'task.task_description': {
		type: String,
		label: "タスク詳細",
		optional: true,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	'task.part': {
		type: Object,
		label: "タスク部分情報",
		autoform: {
			afObjectField: _AF_OBJECTFIELD_FIELDSET_SUB2,
		}
	},
	'task.part.description': {
		type: String,
		label: "　　　説明",
		optional: true,
		autoform: {
			afFieldInput: _AF_FIELDINPUT_TEXTAREA,
			afFormGroup: _AF_FORMGROUP,
		}
	},
	'task.part.説明2': {
		type: [String],
		label: "　　　説明2",
		optional: true,
		autoform: {
			afArrayField: _AF_ARRAYFIELD,
		}
	},
	'task.part.description3': {
		type: String,
		label: "　　　説明3",
		optional: true,
		autoform: {
			afFieldInput: _AF_FIELDINPUT_TEXTAREA,
			afFormGroup: _AF_FORMGROUP,
		}
	},
	snapshot: {
		type: String,
		label: "画像",
		optional: true,
		autoform: {
			afFieldInput: {
				type: 'fileUpload',
				collection: 'Images'
			},
			afFormGroup: _AF_FORMGROUP,
		}
	},
	person: {
		type: Object,
		label: "本人情報",
		autoform: {
			afObjectField: _AF_OBJECTFIELD_FIELDSET,
		}
	},
	'person.address': {
		type: Schemas_Address,
		label: "住所",
		autoform: {
			afObjectField: _AF_OBJECTFIELD_STRUCT,
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
	repetitions: {
		type: Number,
		label: "Repetitions",
		optional: true,
		autoform: {
			afFormGroup: _AF_FORMGROUP,
		}
	},
	priority: {
		type: String,
		label: "優先度",
		allowedValues: ["low", "medium", "high"],
		autoform: {
			afFormGroup: _AF_FORMGROUP,
			type: "select",
			options: function() {
				var option = {
					"low": "low",
					"medium": "medium",
					"high": "high"
				};
				return option;
			}
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

Task = new Meteor.Collection("task");
Task.attachSchema(Schemas_Task);
