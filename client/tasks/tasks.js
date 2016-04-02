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

Template['insert_update_task_content'].rendered = function() {
	var resizeFunc = function() {
		var sz = window.innerHeight - 300;
		$(".tab-content").height(sz);
		$(".iframe-content").height(sz);
	};
	setTimeout(resizeFunc, 100);
/*
	$('#jkafModal').on('show.bs.modal', function(a1, a2) {
		setTimeout(resizeFunc, 100);
	});
*/
	$(window).resize(function() {
		setTimeout(resizeFunc, 10);
	});
}

Template['insert_update_spreadsheet_content'].rendered = function() {
	var resizeFunc = function() {
		var sz = window.innerHeight - 120;
		$(".tab-content").height(sz);
		$(".iframe-content").height(sz);
	};
	setTimeout(resizeFunc, 100);
/*
	$('#jkafModal').on('show.bs.modal', function(a1, a2) {
		setTimeout(resizeFunc, 100);
	});
*/
	$(window).resize(function() {
		setTimeout(resizeFunc, 10);
	});
}

Template.insert_update_spreadsheet_content.events({
	'click #archive': function(){
		console.log("You clicked something");
		$('iframe.spreadsheet').attr('src', null);
		$org_src = $('iframe.spreadsheet').attr('org_src');

		var command = '';
		command += "load:2016-02-13_motor_func_careplan-2016-02.xlsx\n";
		command += "setActiveSheet:0\n";
		command += "copySheet:0:あいう\n";
		command += "save\n";
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: 'http://192.168.1.33:80/PHPExcel/util.php',
			data: {
				command: command,
			},
			success:function(data) {
				$('iframe.spreadsheet').attr('src', $org_src);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
console.log("error----------");
			}
		});
	}

});
