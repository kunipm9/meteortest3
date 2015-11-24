var jkafCollectionObj;
jkafCollectionObj = function(name) {
	return name.split('.').reduce(function(o, x) {
		return o[x];
	}, window);
};

Template.jkafModal.helpers({
	class: function() {
		return Template.currentData().class || "fa fa-pencil";
	}
});

var jkafCollectionHookdId = [];
Template.jkafModal.events({
	'click': function(e, t) {
		e.preventDefault();
		Session.set("jkafTemplate", Template.currentData().template);
		Session.set("jkafDoc", jkafCollectionObj(t.data.collection).findOne({
			_id: t.data.doc
		}));
		Session.set("jkafTitle", Template.currentData().title);
		if (jkafCollectionHookdId.indexOf(Template.currentData().id) >= 0) {
		} else {
			jkafCollectionHookdId.push(Template.currentData().id);
			AutoForm.addHooks(Template.currentData().id, {
				onSuccess: function() {
					$("#jkafModal").modal('hide');
				}
			});
		}
		Session.set("jkafFormid", Template.currentData().id);
		$('#jkafModal').modal('show')
	}
});

Template.jkautoformModals.helpers({
	template: function() {
		return Session.get("jkafTemplate")
	},
	doc: function() {
		return Session.get("jkafDoc");
	},
	title: function() {
		return Session.get("jkafTitle") || "Update";
	},
	formid: function() {
		var formid = Session.get("jkafFormid");
		setupModal(formid);
		return formid;
	},
});
