AutoForm.addInputType("postalcode2", {
  template: "afPostalcode2",
  valueOut: function () {
//console.log("postalcode2 valueOut");
//console.log(this);
//console.log(this.context.value);
    return this.context.value;
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

Template.afPostalcode2.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    delete atts.postalcodeOptions;
    return atts;
  }
});

Template.afPostalcode2.rendered = function () {
  var data = this.data;

  // instanciate datepicker
  $('input#' + data.atts.id).val(data.value);
};

Template.afPostalcode2.events({
	'blur input': function(event) {
//console.log("Template.afPostalcode2.events");
//console.log(this);
		var namelist = this.name.split(".");
//console.log("namelist");
//console.log(namelist);
		var parent = "";
		for(var i=0; i<namelist.length - 1; i++) {
			parent += namelist[i] + ".";
		}
//console.log("parent");
//console.log(parent);
		var opt = this.atts.postalcodeOptions;
//console.log("opt");
//console.log(opt);
		ZipSearchValue = function(data){
//console.log('input[name="' + parent + opt.state + '"]');
			$('input[name="' + parent + opt.state + '"]').val(data.state);
			$('input[name="' + parent + opt.stateName + '"]').val(data.stateNmae);
			$('input[name="' + parent + opt.city + '"]').val(data.city);
			$('input[name="' + parent + opt.street + '"]').val(data.street);
		};
		var zip1 = $('input[name="' + parent + opt.code1 + '"]').val();
		var zip2 = $('input[name="' + parent + opt.code2 + '"]').val();
		$.getJSON('http://api.thni.net/jzip/X0401/JSONP/'+zip1+'/'+zip2+'.js?jsoncallback=?');
	},
});

