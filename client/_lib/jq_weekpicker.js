AutoForm.addInputType("jquery-weekpicker", {
  template: "afJqueryWeekpicker",
  valueOut: function () {
//console.log("jquery-datepicker valueOut");
    if (this.val()) {
//console.log(this.context.value);
      return this.context.value;
    }
    return null;
  },
  valueConverters: {
    "string": function (val) {
      return (val instanceof Date) ? AutoForm.Utility.dateToDateStringUTC(val) : val;
    },
    "stringArray": function (val) {
      if (val instanceof Date) {
        return [AutoForm.Utility.dateToDateStringUTC(val)];
      }
      return val;
    },
    "number": function (val) {
      return (val instanceof Date) ? val.getTime() : val;
    },
    "numberArray": function (val) {
      if (val instanceof Date) {
        return [val.getTime()];
      }
      return val;
    },
    "dateArray": function (val) {
      if (val instanceof Date) {
        return [val];
      }
      return val;
    }
  }
});

Template.afJqueryWeekpicker.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add jquery class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    delete atts.datePickerOptions;
    return atts;
  }
});

Template.afJqueryWeekpicker.rendered = function () {
  var $input = this.data.atts.buttonClasses ? this.$('.input-group.date') : this.$('input');
  var data = this.data;
//console.log("Template.afJqueryWeekpicker.rendered");
//console.log(data);
//console.log($input);

  $('input#' + data.atts.id).weekpicker();

};

Template.afJqueryWeekpicker.destroyed = function () {
};

function utcToLocal(utcDate) {
  var localDateObj = new Date();
  localDateObj.setDate(utcDate.getUTCDate());
  localDateObj.setMonth(utcDate.getUTCMonth());
  localDateObj.setFullYear(utcDate.getUTCFullYear());
  localDateObj.setHours(0);
  localDateObj.setMinutes(0);
  localDateObj.setSeconds(0);
  localDateObj.setMilliseconds(0);
  return localDateObj;
}

