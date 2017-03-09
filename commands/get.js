var jtutil = require('../util');

module.exports = function(argv) {
	if(argv.length != 2) {
		console.log("Usage: get {src file} {key}");
		process.exit(2);
	}
	else {
		return jtutil.readFile(argv[0]).then((content) => {
			return JSON.parse(content.toString())[argv[1]];
		});
	}
};
