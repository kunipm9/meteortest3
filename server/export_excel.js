Meteor.methods({
//sheet_st_p = xml.indexOf('<Worksheet ss:Name="個別機能訓練計画_モニタ">');
//sheet_en_p = xml.indexOf('</Worksheet>', sheet_st_p) + '</Worksheet>'.length;
//axml = xml.substring(0, sheet_st_p) + xml.substring(sheet_st_p, sheet_en_p) + xml.substring(sheet_st_p, sheet_en_p) + xml.substring(sheet_en_p);
//fs.writeFileSync('x.xml', axml);

	export_excel: function(temp) {
		var fs = Npm.require('fs');
		var path = Npm.require('path');
		var basepath = path.resolve('.').split('.meteor')[0];

		var filename = 'indiv_monitor.xml';

		console.log(basepath);
		console.log(filename);

		var xml = fs.readFileSync(basepath + 'template/' + filename, 'utf-8');
//console.log(xml);
		return xml;
	},
});
