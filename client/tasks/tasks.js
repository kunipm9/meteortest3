Template.tasks.events({
	'click .grid_img': function(event) {
		var src = $(event.currentTarget).attr('src');
		Session.set("image_src", src);
		$(".modal_image").modal('toggle');
		event.stopPropagation();
	},
});

Template.insert_update_task_content.events({
	'blur input[name="task_title"]': function(event) {
		var title = $('input[name="task_title"]').val();
		var taskList = TaskList.findOne({ title: title });
		$('input[name="task_description"]').val(taskList.description);
	},
});

var hooksObject = {
	formToDoc: function(doc) {
console.log("insert_task formToDoc");
		doc.procMonth = Session.get('procMonth');
console.log(doc.procMonth);
		return doc;
	}
};
AutoForm.addHooks('insert_task', hooksObject, true);