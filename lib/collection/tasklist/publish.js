if (Meteor.isServer) {

Meteor.publish('tasklists', function() {
	return TaskList.find();
});


Meteor.methods({
	delete_tasklists: function(ids) {
		console.log(ids);
		TaskList.remove({
			_id: {
				$in: ids
			}
		});
	}
});

}
