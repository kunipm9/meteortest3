AutoForm.addInputType("postalcode", {
  template: "afPostalcode",
  valueOut: function () {
//console.log("valueOut");
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

Template.afPostalcode.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    delete atts.postalcodeOptions;
    return atts;
  }
});

Template.afPostalcode.rendered = function () {
  var data = this.data;

  // instanciate datepicker
  $('input#' + data.atts.id).val(data.value);
};

Template.afPostalcode.events({
	'click #postalcv': function(event) {
console.log("Template.afPostalcode.events");
console.log(this);
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
		var zip = $('input[name="' + this.name + '"]').val();
		var zip1;
		var zip2;
		if (zip.indexOf('-') > 0) {
			zip = zip.split('-');
			zip1 = zip[0];
			zip2 = zip[1];
		} else {
			zip1 = zip.substr(0, 3);
			zip2 = zip.substr(3);
			$('input[name="' + this.name + '"]').val(zip1 + '-' + zip2);
		}
		$.getJSON('http://api.thni.net/jzip/X0401/JSONP/'+zip1+'/'+zip2+'.js?jsoncallback=?');
		return false;
	},
});

