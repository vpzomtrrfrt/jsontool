var jtutil = require('../util');

module.exports = function(argv) {
	if(argv.length < 1 || argv.length > 2) {
		console.log("Usage: get {key} [src file]");
		process.exit(2);
	}
	else {
		return jtutil.readFile(argv[1] || "-").then((content) => {
			return JSON.parse(content.toString())[argv[0]];
		});
	}
};
