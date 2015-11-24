Schemas_Address = new SimpleSchema({
	'postalCodecd': {
		type: String,
		label: "zip",
		regEx: /^[0-9]{3}-[0-9]{4}$/,
		autoform: {
			postalcodeOptions: {
				state: null,
				stateName: null,
				city: 'city',
				street: 'street',
			},
			type: "postalcode",
			afFormGroup: { 'formgroup-class': 'row-1 col-sm-4' },
			placeholder: "123-4567",
		}
	},
	'street': {
		label: "Street",
		type: String,
		autoform: {
			afFormGroup: { 'formgroup-class': 'row-1 col-sm-6' },
		}
	},
	'street2': {
		label: "Street2",
		type: String,
		optional: true,
		autoform: {
			afFormGroup: { 'formgroup-class': 'row-2 col-sm-6' },
		}
	},
	'city': {
		label: "City",
		type: String,
		autoform: {
			afFormGroup: { 'formgroup-class': 'row-2 col-sm-6' },
		}
	},
	'state': {
		label: "State",
		type: String,
		allowedValues: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
		autoform: {
			afFieldInput: {
				firstOption: "(Select a State)"
			},
			afFormGroup: { 'formgroup-class': 'row-3 col-sm-6' },
		}
	},
});

