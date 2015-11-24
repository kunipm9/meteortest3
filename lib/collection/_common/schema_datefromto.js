Schemas_DateFromTo = new SimpleSchema({
	'from': {
		type: String,
		label: "自",
		optional: true,
		autoform: {
			type: "pika-datepicker",
		//	type: 'smalt-addon-icon',
		//	icon: 'fa fa-fw fa-calendar',
		//	right: true,
			afFormGroup: { 'formgroup-class': 'row-1 col-sm-5' },
			placeholder: "yyyy-mm-dd",
		}
	},
	'to': {
		type: String,
		label: "至",
		optional: true,
		autoform: {
			type: "pika-datepicker",
		//	type: 'smalt-addon-icon',
		//	icon: 'fa fa-fw fa-calendar',
		//	right: true,
			afFormGroup: { 'formgroup-class': 'row-1 col-sm-5' },
			placeholder: "yyyy-mm-dd",
		}
	},
});

Schemas_DateFromTo_FT = new SimpleSchema({
	'from': {
		type: String,
		label: "自",
		autoform: {
			type: "pika-datepicker",
			afFormGroup: { 'formgroup-class': 'row-1 col-sm-5' },
			placeholder: "yyyy-mm-dd",
		}
	},
	'to': {
		type: String,
		label: "至",
		autoform: {
			type: "pika-datepicker",
			afFormGroup: { 'formgroup-class': 'row-1 col-sm-5' },
			placeholder: "yyyy-mm-dd",
		}
	},
});

Schemas_DateFromTo_F = new SimpleSchema({
	'from': {
		type: String,
		label: "自",
		autoform: {
			type: "pika-datepicker",
			afFormGroup: { 'formgroup-class': 'row-1 col-sm-5' },
			placeholder: "yyyy-mm-dd",
		}
	},
	'to': {
		type: String,
		label: "至",
		optional: true,
		autoform: {
			type: "pika-datepicker",
			afFormGroup: { 'formgroup-class': 'row-1 col-sm-5' },
			placeholder: "yyyy-mm-dd",
		}
	},
});

Schemas_DateFromTo_T = new SimpleSchema({
	'from': {
		type: String,
		label: "自",
		optional: true,
		autoform: {
			type: "pika-datepicker",
			afFormGroup: { 'formgroup-class': 'row-1 col-sm-5' },
			placeholder: "yyyy-mm-dd",
		}
	},
	'to': {
		type: String,
		label: "至",
		autoform: {
			type: "pika-datepicker",
			afFormGroup: { 'formgroup-class': 'row-1 col-sm-5' },
			placeholder: "yyyy-mm-dd",
		}
	},
});

