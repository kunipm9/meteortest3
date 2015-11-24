TaskList.after.remove(function(userId, doc) {
	var tasks = Task.find({ taskListId: doc._id }, { fields: { _id: 1 } }).fetch();
	var ids = [];
	for (t in tasks) {
		ids.push(tasks[t]._id);
	}
	Meteor.call('delete_tasks', ids, function(error, result) {
		//console.log(error);
		//console.log(result);
	});
});


Task.after.update(function (userId, doc, fieldNames, modifier, options) {
	var oldDoc = this.previous;

console.log("--sk.before.update");
console.log("old");
console.log(oldDoc);
console.log("new");
console.log(doc);

console.log("diff");
console.log(jsDiff2Mongo(oldDoc, doc));
console.log("rdiff");
console.log(jsDiff2Mongo(doc, oldDoc));
});

Task.helpers({
	fullAddress: function() {
		return this.person.address.postalCodecd + ' ' + this.person.address.city + ' ' + this.person.address.street;
	},
});

