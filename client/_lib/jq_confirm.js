AutoForm.addInputType("confirm", {
  template: "afConfirm",
  valueOut: function () {
//console.log("confirm valueOut");
//console.log(this);
    return this.context.value;
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
});

Template.afConfirm.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    return atts;
  },
  aatts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    return atts;
  },
  hatts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts['id'] = atts.id + '_';
    return atts;
  },
  catts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts['id'] = atts.id + 'c';
    return atts;
  },
});

Template.afConfirm.rendered = function () {
  var $input = this.$('input');
  var data = this.data;

//console.log("Template.afConfirm.rendered");
//console.log(data);
//console.log($input);

  var id = this.data.atts.id;
  var tmp = data.value.split("#");
//console.log("tmp");
//console.log(tmp);
  var old_date = tmp[0];
  var old_user_id = tmp[1];
  if (old_user_id != undefined && old_user_id.length > 0) {
    var user_old = Meteor.users.findOne({_id: old_user_id});
//console.log("user_old");
//console.log(user_old);
    var name = user_old.profile.firstName + user_old.profile.lastName
    var str = s.sprintf("%s %s", old_date, name);
    $('input#' + id).val(str);
  } else {
    old_user_id = "";
  }
  
  $('a#' + id).click(function() {
    if (old_user_id == "") {
      var user = Meteor.user();
      var name = user.profile.firstName + user.profile.lastName;
      var now = new Date();
      var str = s.sprintf("%04d-%02d-%02d %s", now.getFullYear(), month = now.getMonth()+1, now.getDate(), name);
      var str2 = s.sprintf("%04d-%02d-%02d#%s", now.getFullYear(), month = now.getMonth()+1, now.getDate(), user._id);

      $('input#' + id).val(str);
      $('input#' + id + "_").val(str2);
      old_user_id = user._id;
    }
  });

  $('a#' + id + "c").click(function() {
    var user = Meteor.user();
    if (old_user_id == user._id) {
      $('input#' + id).val("");
      $('input#' + id + "_").val("");
      old_user_id = "";
    }
  });
};

Template.afConfirm.destroyed = function () {
//console.log("Template.afSelect2Add.destroyed");
//console.log(this.data.pikaday);
};
