Schemas_Address = new SimpleSchema({
	'postalCodecd': {
		type: String,
		label: "zip",
		regEx: /^[0-9]{3}-[0-9]{4}$/,
		autoform: {
			postalcodeOptions: {
				state: null,
				stateName: 'prefecture',
				city: null,
				street: null,
				citystreet: 'cityTownStreet',
			},
			type: "postalcode",
			afFormGroup: { 'formgroup-class': 'row-1 col-sm-4' },
			placeholder: "123-4567",
		}
	},
	'prefecture': {
		label: "都道府県",
		type: String,
		allowedValues: [
"北海道",
"青森県",
"秋田県",
"岩手県",
"山形県",
"宮城県",
"福島県",
"栃木県",
"群馬県",
"茨城県",
"埼玉県",
"千葉県",
"東京都",
"神奈川県",
"山梨県",
"長野県",
"新潟県",
"富山県",
"石川県",
"福井県",
"静岡県",
"岐阜県",
"愛知県",
"三重県",
"和歌山県",
"奈良県",
"滋賀県",
"京都府",
"大阪府",
"兵庫県",
"鳥取県",
"岡山県",
"島根県",
"広島県",
"山口県",
"徳島県",
"香川県",
"愛媛県",
"高知県",
"福岡県",
"佐賀県",
"長崎県",
"熊本県",
"大分県",
"宮崎県",
"鹿児島県",
"沖縄県"
		],
		autoform: {
			afFieldInput: {
				firstOption: "(都道府県選択)"
			},
			afFormGroup: { 'formgroup-class': 'row-1 col-sm-3' },
		}
	},
	'cityTownStreet': {
		label: "市区町村・町丁",
		type: String,
		autoform: {
			afFormGroup: { 'formgroup-class': 'row-2 col-sm-12' },
		}
	},
	'building': {
		label: "番地・建物",
		type: String,
		autoform: {
			afFormGroup: { 'formgroup-class': 'row-3 col-sm-12' },
		}
	},
});

