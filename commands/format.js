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
		tr += obj[str.substring(ind+1, end)];
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
