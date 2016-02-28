
_AF_FORM_INPUT_COL_CLASS = 'col-sm-9';

_AF_FORM_LABEL_CLASS = 'col-sm-3';

_AF_FIELDINPUT_TEXTAREA = {
	type: 'textarea',
	class: 'textarea_autosize',
};

_AF_FIELDINPUT_PERCENTAGE = {
	type: 'percentage',
};

_AF_FORMGROUP = {
	template: 'bootstrap3-horizontal',
	'label-class': _AF_FORM_LABEL_CLASS,
	'input-col-class': _AF_FORM_INPUT_COL_CLASS,
};

_AF_FORMGROUP_NOLABEL = {
	template: 'nolabel',
	'label-class': _AF_FORM_LABEL_CLASS,
	'input-col-class': _AF_FORM_INPUT_COL_CLASS,
};

_AF_OBJECTFIELD_FIELDSET = {
	template: 'fieldset',
};

_AF_OBJECTFIELD_FIELDSET_SUB = {
	template: 'fieldset-sub',
};

_AF_OBJECTFIELD_FIELDSET_SUB2 = {
	template: 'fieldset-sub2',
};

_AF_OBJECTFIELD_STRUCT = {
	template: 'bootstrap3-horizontal',
	'label-class': _AF_FORM_LABEL_CLASS,
	'input-col-class': _AF_FORM_INPUT_COL_CLASS,
};

_AF_OBJECTFIELD_STRUCT_NOLABEL = {
	template: 'struct_nolabel',
	'label-class': _AF_FORM_LABEL_CLASS,
	'input-col-class': _AF_FORM_INPUT_COL_CLASS,
};

_AF_ARRAYFIELD = {
	template: 'arrayfield',
	'label-class': _AF_FORM_LABEL_CLASS,
	'input-col-class': _AF_FORM_INPUT_COL_CLASS,
};


_AF_FORMGROUP_COLSM3 = {
	'formgroup-class': 'col-sm-3'
};

_AF_FORMGROUP_COLSM6 = {
	'formgroup-class': 'col-sm-6'
};

_AF_ARRAYFIELD_LABEL = function(schema) {
//console.log("_AF_ARRAYFIELD_LABEL")
	var ret = "";
	_.each(schema._schema, function(value, key, object) {
		var cls = value.autoform.afFormGroup['formgroup-class'].split(" ");
		var cls_col = '';
		var data_required = '';
//console.log(value);
//console.log(cls);
		_.each(cls, function(value, index, elem) {
			if (value.indexOf('col-') === 0) {
				cls_col = value;
			}
		});
//console.log(value.label);
//console.log(cls_col);
		if (!(value.optional || false)) {
			data_required = 'data-required';
		}
		ret += s.sprintf("<label class='%s %s control-label autoform-array-label'>%s</label>", cls_col, data_required, value.label);
	});

	return ret;
};

_AF_FORMGROUP_COLSM = function(disp_cols, width_cols) {
	var disp_width = Math.ceil(disp_cols * 100 / width_cols);
	return {
		'label-class': 'col-sm-' + width_cols,
		'input-col-class': 'col-sm-' + width_cols,
		'style': 'width: ' + disp_width + '%',
	}
};
