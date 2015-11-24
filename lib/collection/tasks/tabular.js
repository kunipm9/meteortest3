TabularTables.Tasks = new Tabular.Table({
	name: "Tasks",
	collection: Task,
	pub: "tabular_tasks",
	columns: [{
		data: "taskListId",
		visible: false
	}, {
		data: "taskList",
		title: "TList",
		render: function(val, type, doc) {
			if (doc.taskListId != undefined) {
				return TaskList.findOne({ _id: doc.taskListId }, { title: 1, _id: 0 }).title;
			}
		}
	}, {
		data: "title",
		title: "Title"
	}, {
		data: "description",
		title: "説明"
	}, {
		data: "userId",
		visible: false
	}, {
		data: "user",
		title: "User",
		render: function(val, type, doc) {
			if (doc.taskListId != undefined) {
				var userId = TaskList.findOne({ _id: doc.taskListId }, { userId: 1, _id: 0 }).userId;
				var user = Meteor.users.findOne({ _id: userId });
				var fullname = user.profile.firstName + " " + user.profile.lastName;
				return fullname;
			}
		}
	}, {
		data: "priority",
		title: "優先度"
	}, {
		data: "deadline",
		title: "期限",
		render: function(val, type, doc) {
			//if (val instanceof Date) {
			if (val) {
				return moment(val).locale(getUserLanguage()).calendar();
			}
			else {
				return "Never";
			}
		}
	}, {
		data: "snapshot",
		visible: false
	}, {
		data: "image",
		title: "画像",
		render: function(val, type, doc) {
			if (doc.snapshot != undefined) {
				var image = Images.findOne({ _id: doc.snapshot });
				var key = image.copies.images.key.replace(/-/g, "/");
				var name = image.original.name;
				var src = "cfs/files/" + key;
				return Blaze.toHTMLWithData(Template.render_image, {
					src: src,
					title: doc.title,
					htmlid: name,
				});
			}
		}
	}, {
		tmpl: Meteor.isClient && Template.operation_task,
		title: "&nbsp;&nbsp;",
	}]
});
