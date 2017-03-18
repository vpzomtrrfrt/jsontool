var jtutil = require('../util');

function format(str, obj) {
	var pos = 0;
	var tr = "";
	while(true) {
		var ind = str.indexOf("%", pos);
		if(ind < 0) {
			break;
		}
		var end = str.indexOf("%", ind+1);
		if(end < 0) {
			throw "Unmatched %";
		}
		tr += str.substring(pos, ind);
		var key = str.substring(ind+1, end);
		var value;
		if(key in obj) {
			value = obj[key];
		}
		else {
			var spl = key.split('.');
			value = obj;
			spl.forEach((k) => {
				value = value[k];
			});
		}
		tr += value;
		pos = end+1;
	}
	return tr;
}

module.exports = function(argv) {
	if(argv.length < 1 || argv > 2) {
		console.log("Usage: format {format} [file]");
		process.exit(2);
	}
	return jtutil.readFile(argv[1] || "-")
	.then((content) => {
		var obj = JSON.parse(content.toString());
		if(Array.isArray(obj)) {
			return obj.map(format.bind(this, argv[0])).join("\n");
		}
		else {
			return format(argv[0], obj);
		}
	});
};
