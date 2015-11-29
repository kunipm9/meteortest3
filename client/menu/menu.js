_libSetDefault = function() {
	dObj = new Date();
	var y = dObj.getFullYear();
	var m = dObj.getMonth() + 1;
	var cur = s.sprintf("%d%02d", y, m);
	Session.setDefault('procMonth', cur);

	var monthOptions = generateSelectOptionsMonthList();
	$(monthOptions).each(function(i, v){
		if (v.value == cur) {
			Session.setDefault('procMonthString', v.label);
		}
	});
}

_libSetDefault();

Template.menu.rendered = function() {
//var user = Meteor.user()
//console.log(user);
//var user2 = Meteor.users.findOne({_id: user._id});
//console.log(user2);

	var procMonth = Session.get('procMonth');
	var procMonthString = Session.get('procMonthString');
console.log(procMonth);
console.log(procMonthString);

	var monthOptions = generateSelectOptionsMonthList();
	$(monthOptions).each(function(i, v){
		$("#procMonth").append($("<option>", { value: v.value, html: v.label }));
	});
	$("#procMonth option[value='" + procMonth + "']").prop('selected', true);

	$('#procMonth').on('change', function(e) {
		var procMonth = $(this).find(":selected").val();
		var procMonthString = $(this).find(":selected").text();
		Session.set('procMonthString', procMonthString);
		Session.set('procMonth', procMonth);
console.log(procMonth);
console.log(procMonthString);
	});

	$('#download').on('click', function(e) {
		Meteor.call('export_excel', 'test', function(error, xml) {
var sheet_st_p = xml.indexOf('<Worksheet ss:Name="個別機能訓練計画_モニタ">');
var sheet_en_p = xml.indexOf('</Worksheet>', sheet_st_p) + '</Worksheet>'.length;
var xml_st = xml.substring(0, sheet_st_p);
var xml_sheet_org = xml.substring(sheet_st_p, sheet_en_p);
var xml_sheet2 = xml_sheet_org.replace('個別機能訓練計画_モニタ', '個別機能訓練計画_モニタ2');
var xml_ed = xml.substring(sheet_en_p);
var axml = xml_st + xml_sheet_org + xml_sheet2 + xml_ed;
			saveAs(new Blob([axml],{type:""}), "test.xml");
		});
	});

}
