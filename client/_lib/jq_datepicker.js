AutoForm.addInputType("jquery-datepicker", {
  template: "afJqueryDatepicker",
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

Template.afJqueryDatepicker.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add jquery class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    delete atts.datePickerOptions;
    return atts;
  }
});

Template.afJqueryDatepicker.rendered = function () {
  var $input = this.data.atts.buttonClasses ? this.$('.input-group.date') : this.$('input');
  var data = this.data;
//console.log("Template.afJqueryDatepicker.rendered");
//console.log(data);
//console.log($input);

$('input#' + data.atts.id).on('focus', function(){
    $(this).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1930:'+(new Date).getFullYear()
    });
    $(this).datepicker('show');
});

/***
  // instanciate datepicker
  var pikaday = new Pikaday({ field: $input[0], i18n: i18n_pickaday, yearSuffix: i18n_pickaday_yearSuffix, setDefaultDate: true, });
  this.data.pikaday = pikaday;
  $('input#' + data.atts.id).val(data.value);
  pikaday.gotoDate(new Date(data.value));

  // set and reactively update values
  this.autorun(function () {
    var data = Template.currentData();

    // set field value
    if (data.value instanceof Date) {
      pikaday.setDate(data.value);
    } else if (typeof data.value === "string") {
      pikaday.setDate(data.value);
    }

    // set start date if there's a min in the schema
    if (data.min instanceof Date) {
      // datepicker plugin expects local Date object,
      // so convert UTC Date object to local
      var startDate = utcToLocal(data.min);
      pikaday.setMinDate(startDate);
    }

    // set end date if there's a max in the schema
    if (data.max instanceof Date) {
      // datepicker plugin expects local Date object,
      // so convert UTC Date object to local
      var endDate = utcToLocal(data.max);
      pikaday.setMaxDate(startDate);
    }
  });
***/
};

Template.afJqueryDatepicker.destroyed = function () {
//console.log("Template.afJqueryDatepicker.destroyed");
//console.log(this.data.pikaday);
  if (this.data.pikaday) {
      this.data.pikaday.destroy();
  }
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

