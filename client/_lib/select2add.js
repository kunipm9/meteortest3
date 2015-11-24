AutoForm.addInputType("select2-add", {
  template: "afSelect2Add",
  valueOut: function () {
    return this.val();
  },
  valueConverters: {
    "stringArray": AutoForm.valueConverters.stringToStringArray,
    "number": AutoForm.valueConverters.stringToNumber,
    "numberArray": AutoForm.valueConverters.stringToNumberArray,
    "boolean": AutoForm.valueConverters.stringToBoolean,
    "booleanArray": AutoForm.valueConverters.stringToBooleanArray,
    "date": AutoForm.valueConverters.stringToDate,
    "dateArray": AutoForm.valueConverters.stringToDateArray
  },
  contextAdjust: function (context) {
    //can fix issues with some browsers selecting the firstOption instead of the selected option
    context.atts.autocomplete = "off";

    var itemAtts = _.omit(context.atts, 'firstOption');
    var firstOption = context.atts.firstOption;

    // build items list
    context.items = [];

    // If a firstOption was provided, add that to the items list first
    if (firstOption !== false) {
      context.items.push({
        name: context.name,
        label: (typeof firstOption === "string" ? firstOption : "(Select One)"),
        value: "",
        // _id must be included because it is a special property that
        // #each uses to track unique list items when adding and removing them
        // See https://github.com/meteor/meteor/issues/2174
        //
        // Setting this to an empty string caused problems if option with value
        // 1 was in the options list because Spacebars evaluates "" to 1 and
        // considers that a duplicate.
        // See https://github.com/aldeed/meteor-autoform/issues/656
        _id: "AUTOFORM_EMPTY_FIRST_OPTION",
        selected: false,
        atts: itemAtts
      });
    }

    // Add all defined options
    _.each(context.selectOptions, function(opt) {
      if (opt.optgroup) {
        var subItems = _.map(opt.options, function(subOpt) {
          return {
            name: context.name,
            label: subOpt.label,
            value: subOpt.value,
            htmlAtts: _.omit(subOpt, 'label', 'value'),
            // _id must be included because it is a special property that
            // #each uses to track unique list items when adding and removing them
            // See https://github.com/meteor/meteor/issues/2174
            //
            // The toString() is necessary because otherwise Spacebars evaluates
            // any string to 1 if the other values are numbers, and then considers
            // that a duplicate.
            // See https://github.com/aldeed/meteor-autoform/issues/656
            _id: subOpt.value.toString(),
            selected: (subOpt.value === context.value),
            atts: itemAtts
          };
        });
        context.items.push({
          optgroup: opt.optgroup,
          items: subItems
        });
      } else {
        context.items.push({
          name: context.name,
          label: opt.label,
          value: opt.value,
          htmlAtts: _.omit(opt, 'label', 'value'),
          // _id must be included because it is a special property that
          // #each uses to track unique list items when adding and removing them
          // See https://github.com/meteor/meteor/issues/2174
          //
          // The toString() is necessary because otherwise Spacebars evaluates
          // any string to 1 if the other values are numbers, and then considers
          // that a duplicate.
          // See https://github.com/aldeed/meteor-autoform/issues/656
          _id: opt.value.toString(),
          selected: (opt.value === context.value),
          atts: itemAtts
        });
      }
    });

    return context;
  }
});

Template.afSelect2Add.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    delete atts.chosenOptions;
    return atts;
  },
  path: function () {
    return this.atts.pathFor || "";
  },
});

Template.afSelect2Add.rendered = function () {
  var $input = this.$('select');
  var data = this.data;
//console.log("Template.afSelect2Add.rendered");
//console.log(data);
//console.log($input);

  // instanciate datepicker
  $('select#' + this.data.atts.id).select2({ width: 'calc(100% - 58px)', height: '34px' });

/**
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
**/
};

Template.afSelect2Add.destroyed = function () {
//console.log("Template.afSelect2Add.destroyed");
//console.log(this.data.pikaday);
};
