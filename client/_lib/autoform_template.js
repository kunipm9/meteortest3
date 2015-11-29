Template["afFormGroup_nolabel"].helpers({
  afFieldInputAtts: function () {
    var atts = _.omit(this.afFieldInputAtts || {}, 'input-col-class');
    // We have a special template for check boxes, but otherwise we
    // want to use the same as those defined for bootstrap3 template.
    atts.template = "bootstrap3";
    return atts;
  },
  afFieldLabelAtts: function () {
    var atts = _.clone(this.afFieldLabelAtts || {});
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "control-label");
    return atts;
  },
  rightColumnClass: function () {
    var atts = this.afFieldInputAtts || {};
    return atts['input-col-class'] || "";
  },
});


Template["afObjectField_struct_nolabel"].helpers({
  rightColumnClass: function () {
    return this['input-col-class'] || "";
  },
  afFieldLabelAtts: function () {
    // Use only atts beginning with label-
    var labelAtts = {};
    _.each(this, function (val, key) {
      if (key.indexOf("label-") === 0) {
        labelAtts[key.substring(6)] = val;
      }
    });
    // Add bootstrap class
    labelAtts = AutoForm.Utility.addClass(labelAtts, "control-label");
    return labelAtts;
  },
  quickFieldsAtts: function () {
    var atts = _.pick(this, 'name', 'id-prefix');
    // We want to default to using bootstrap3 template below this point
    // because we don't want horizontal within horizontal
    atts.template = 'bootstrap3-horizontal';
    return atts;
  }
});

Template["afObjectField_fieldset"].helpers({
  quickFieldsAtts: function () {
    var atts = _.pick(this, 'name', 'id-prefix');
    return atts;
  }
});

Template["afObjectField_fieldset-sub"].helpers({
  quickFieldsAtts: function () {
    var atts = _.pick(this, 'name', 'id-prefix');
    return atts;
  }
});

Template["afObjectField_fieldset-sub2"].helpers({
  quickFieldsAtts: function () {
    var atts = _.pick(this, 'name', 'id-prefix');
    return atts;
  }
});

Template["afArrayField_arrayfield"].helpers({
		rightColumnClass: function() {
			var atts = this.atts || {};
			return atts['input-col-class'] || "";
		},
		afFieldLabelAtts: function() {
			// Use only atts beginning with label-
			var labelAtts = {};
			_.each(this.atts, function(val, key) {
				if (key.indexOf("label-") === 0) {
					labelAtts[key.substring(6)] = val;
				}
			});
			// Add bootstrap class
			labelAtts = AutoForm.Utility.addClass(labelAtts, "control-label");
			return labelAtts;
		},
		fieldLabels: function() {
//console.log("fieldLabels");
//console.log(this);
			var atts = this.atts || {};
			var fieldLabels = atts['fieldLabels'] || "";
			if (fieldLabels.length > 0) {
				fieldLabels = "<div class='autoform-array-item-body'>" + fieldLabels + "</div>";
				return new Handlebars.SafeString(fieldLabels);
			} else {
				return null;
			}
		}
	}
);
