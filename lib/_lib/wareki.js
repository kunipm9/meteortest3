
seirekiToWareki = function(str){
	if (str === "undefined" || str == null || str == "") return "";
	var gengou = "";
	var year = "";
	a = str.split("-");
	a[0] = parseInt(a[0]);
	a[1] = parseInt(a[1]);
	a[2] = parseInt(a[2]);
	if (a[0] > 1989 || (a[0] == 1989 && a[1] == 1 && a[2] > 6)) {
		a[0] = a[0] - 1988;
		gengou = "H";
	} else if(a[0] > 1926 || (a[0] == 1926 && a[1] == 12 && a[2] > 24)) {
		a[0] = a[0] - 1925;
		gengou = "S";
	} else if(a[0] > 1912 || (a[0] == 1912 && a[1] == 7 && a[2] > 30)) {
		a[0] = a[0] - 1911;
		gengou = "T";
	} else if(a[0] > 1868 || (a[0] == 1868 && a[1] == 1 && a[2] > 24)) {
		a[0] = a[0] - 1867;
		gengou = "M";
	}
	return sprintf("%s%02d-%02d-%02d", gengou, a[0], a[1], a[2]);
}


warekiToSeireki = function(str){
	if (str === "undefined" || str == null || str == "") return "";

	if (str.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/) || str.match(/^\d{4}\.\d{1,2}\.\d{1,2}$/) || str.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
		a = str.split(/[^0-9]/);
		a[0] = parseInt(a[0]);
		a[1] = parseInt(a[1]);
		a[2] = parseInt(a[2]);

		return sprintf("%04d-%02d-%02d", a[0], a[1], a[2]);
	}

	var gengou = "";
	var year = "";
	var flag_M = 0;
	var flag_T = 0;
	var flag_H = 0;
	var flag_S = 0;

	str = str.replace("年", "-");
	str = str.replace("月", "-");
	str = str.replace("日", "");

	if (str.indexOf("明治") != -1) {
		flag_M = 1;
		str = str.replace("明治", "");
	}
	if (str.indexOf("明") != -1) {
		flag_M = 1;
		str = str.replace("明", "");
	}
	if (str.indexOf("M") != -1) {
		flag_M = 1;
		str = str.replace("M", "");
	}
	if (str.indexOf("m") != -1) {
		flag_M = 1;
		str = str.replace("m", "");
	}

	if (str.indexOf("大正") != -1) {
		flag_T = 1;
		str = str.replace("大正", "");
	}
	if (str.indexOf("大") != -1) {
		flag_T = 1;
		str = str.replace("大", "");
	}
	if (str.indexOf("T") != -1) {
		flag_T = 1;
		str = str.replace("T", "");
	}
	if (str.indexOf("t") != -1) {
		flag_T = 1;
		str = str.replace("t", "");
	}

	if (str.indexOf("昭和") != -1) {
		flag_S = 1;
		str = str.replace("昭和", "");
	}
	if (str.indexOf("昭") != -1) {
		flag_S = 1;
		str = str.replace("昭", "");
	}
	if (str.indexOf("S") != -1) {
		flag_S = 1;
		str = str.replace("S", "");
	}
	if (str.indexOf("s") != -1) {
		flag_S = 1;
		str = str.replace("s", "");
	}

	if (str.indexOf("平成") != -1) {
		flag_H = 1;
		str = str.replace("平成", "");
	}
	if (str.indexOf("平") != -1) {
		flag_H = 1;
		str = str.replace("平", "");
	}
	if (str.indexOf("H") != -1) {
		flag_H = 1;
		str = str.replace("H", "");
	}
	if (str.indexOf("h") != -1) {
		flag_H = 1;
		str = str.replace("h", "");
	}

	a = str.split(/[^0-9]/);
	a[0] = parseInt(a[0]);
	a[1] = parseInt(a[1]);
	a[2] = parseInt(a[2]);

	if (flag_M) a[0] += 1867;
	if (flag_T) a[0] += 1911;
	if (flag_S) a[0] += 1925;
	if (flag_H) a[0] += 1988;

	if (flag_M || flag_T || flag_S || flag_H) {
		return sprintf("%04d-%02d-%02d", a[0], a[1], a[2]);
	} else {
		return str;
	}
}

seirekiToWareki_YM = function(str){
	if (str === "undefined" || str == null || str == "") return "";
	var gengou = "";
	var year = "";
	a = str.split("-");
	a[0] = parseInt(a[0]);
	a[1] = parseInt(a[1]);
	if (a[0] > 1989 || (a[0] == 1989 && a[1] == 1 && a[2] > 6)) {
		a[0] = a[0] - 1988;
		gengou = "H";
	} else if(a[0] > 1926 || (a[0] == 1926 && a[1] == 12 && a[2] > 24)) {
		a[0] = a[0] - 1925;
		gengou = "S";
	} else if(a[0] > 1912 || (a[0] == 1912 && a[1] == 7 && a[2] > 30)) {
		a[0] = a[0] - 1911;
		gengou = "T";
	} else if(a[0] > 1868 || (a[0] == 1868 && a[1] == 1 && a[2] > 24)) {
		a[0] = a[0] - 1867;
		gengou = "M";
	}
	return sprintf("%s%02d-%02d", gengou, a[0], a[1]);
}

warekiToSeireki_YM = function(str){
	if (str === "undefined" || str == null || str == "") return "";

	var gengou = "";
	var year = "";
	var flag_M = 0;
	var flag_T = 0;
	var flag_H = 0;
	var flag_S = 0;

	str = str.replace("年", "-");
	str = str.replace("月", "-");
	str = str.replace("日", "");

	if (str.indexOf("明治") != -1) {
		flag_M = 1;
		str = str.replace("明治", "");
	}
	if (str.indexOf("明") != -1) {
		flag_M = 1;
		str = str.replace("明", "");
	}
	if (str.indexOf("M") != -1) {
		flag_M = 1;
		str = str.replace("M", "");
	}
	if (str.indexOf("m") != -1) {
		flag_M = 1;
		str = str.replace("m", "");
	}

	if (str.indexOf("大正") != -1) {
		flag_T = 1;
		str = str.replace("大正", "");
	}
	if (str.indexOf("大") != -1) {
		flag_T = 1;
		str = str.replace("大", "");
	}
	if (str.indexOf("T") != -1) {
		flag_T = 1;
		str = str.replace("T", "");
	}
	if (str.indexOf("t") != -1) {
		flag_T = 1;
		str = str.replace("t", "");
	}

	if (str.indexOf("昭和") != -1) {
		flag_S = 1;
		str = str.replace("昭和", "");
	}
	if (str.indexOf("昭") != -1) {
		flag_S = 1;
		str = str.replace("昭", "");
	}
	if (str.indexOf("S") != -1) {
		flag_S = 1;
		str = str.replace("S", "");
	}
	if (str.indexOf("s") != -1) {
		flag_S = 1;
		str = str.replace("s", "");
	}

	if (str.indexOf("平成") != -1) {
		flag_H = 1;
		str = str.replace("平成", "");
	}
	if (str.indexOf("平") != -1) {
		flag_H = 1;
		str = str.replace("平", "");
	}
	if (str.indexOf("H") != -1) {
		flag_H = 1;
		str = str.replace("H", "");
	}
	if (str.indexOf("h") != -1) {
		flag_H = 1;
		str = str.replace("h", "");
	}

	a = str.split(/[^0-9]/);
	a[0] = parseInt(a[0]);
	a[1] = parseInt(a[1]);

	if (flag_M) a[0] += 1867;
	if (flag_T) a[0] += 1911;
	if (flag_S) a[0] += 1925;
	if (flag_H) a[0] += 1988;

	return sprintf("%04d-%02d", a[0], a[1]);
}

