generateSelectOptionsFromCollection = function(collection, sel, label_field, value_field) {
	var field = {};
	field[label_field] = 1;
	field[value_field] = 1;
	var list = collection.find(sel, {
		fields: field
	}).fetch();
	var option = [];
	for (u = 0; u < list.length; u++) {
		option.push({
			label: list[u][label_field],
			value: list[u][value_field],
		});
	}
	return option;
}

generateSelectOptionsMonthList = function() {
	var myD = new Date();
	var cur_y = myD.getFullYear();
	var cur_m = myD.getMonth() + 1;

	var option = [];
	var next = 0;
	for(var j=0; j<3; j++) {
		for(var i=1; i<=12; i++) {
			if (next == 9) {
				break;
			}
			if (next) {
				option.push({
					value: sprintf("%d%02d", cur_y - 1 + j, i),
					label: sprintf("%d年%2d月 ((来月))", cur_y - 1 + j, i)
				});
				next = 9;
			} else if (cur_y - 1 + j == cur_y && i == cur_m) {
				option.push({
					value: sprintf("%d%02d", cur_y - 1 + j, i),
					label: sprintf("%d年%2d月 (今月)", cur_y - 1 + j, i)
				});
				next = 1;
			} else {
				option.push({
					value: sprintf("%d%02d", cur_y - 1 + j, i),
					label: sprintf("%d年%2d月", cur_y - 1 + j, i)
				});
			}
		}
	}
	return option;

}
