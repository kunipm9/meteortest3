Meteor.users.after.remove(function(userId, doc) {
	var lists = TaskList.find({ userId: doc._id }, { fields: { _id: 1 } }).fetch();
	var ids = [];
	for (t in lists) {
		ids.push(lists[t]._id);
	}
	Meteor.call('delete_tasklists', ids, function(error, result) {
		//console.log(error);
		//console.log(result);
	});
});
