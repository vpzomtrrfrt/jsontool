var jtutil = require('../util');

module.exports = function(argv) {
	if(argv.length < 1 || argv.length > 2) {
		console.log("Usage: get {key} [src file]");
		process.exit(2);
	}
	else {
		return jtutil.readFile(argv[1] || "-").then((content) => {
			var data = JSON.parse(content.toString());
			if(argv[0] in data) {
				return data[argv[0]];
			}
			else if("map" in data) {
				return data.map((elem) => elem[argv[0]]);
			}
		});
	}
};
