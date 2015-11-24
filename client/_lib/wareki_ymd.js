AutoForm.addInputType("wareki-ymd", {
  template: "afWarekiYMD",
  valueOut: function () {
//console.log("wareki-ymd valueOut");
//console.log(this);
    if (this.context.textContent) {
//console.log(this.context.textContent);
      return this.context.textContent;
    }
    return null;
  },
  valueConverters: {
    "string": function (val) {
      return val;
    },
    "stringArray": function (val) {
      return val;
    },
    "number": function (val) {
      return val;
    },
    "numberArray": function (val) {
      return val;
    },
    "dateArray": function (val) {
      return val;
    }
  }
});

Template.afWarekiYMD.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    // delete atts.postalcodeOptions;
    return atts;
  },
  atts_div: function addFormControlAtts() {
    var atts_div = _.clone(this.atts);
    return atts_div;
  },
});

Template.afWarekiYMD.rendered = function () {
  var data = this.data;

  // instanciate datepicker
  $('input#' + data.atts.id).val(seirekiToWareki(data.value));
  $('div#' + data.atts.id).text(warekiToSeireki(data.value));
};

Template.afWarekiYMD.events({
  'blur input': function(event) {
//console.log("Template.afWarekiYMD.events");
//console.log(this);
    var date = $('input#' + this.atts.id).val();
    var date = warekiToSeireki(date);
    $('input#' + this.atts.id).val(seirekiToWareki(date));
    $('div#' + this.atts.id).text(date);
  },
});

