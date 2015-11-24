if (Meteor.isServer) {

Meteor.publish('tasks', function() {
	//if(Roles.userIsInRole(this.userId, 'admin'){
	return Task.find();
	//}
	//else{
	//}
});


Meteor.methods({
	delete_tasks: function(ids) {
		console.log(ids);
		Task.remove({
			_id: {
				$in: ids
			}
		});
	},
});

}
