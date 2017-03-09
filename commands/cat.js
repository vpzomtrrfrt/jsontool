var jtutil = require('../util');

module.exports = function(argv) {
	return Promise.all(argv.map((path) => jtutil.readFile(path)))
		.then((files) => {
			var tr = [];
			files.forEach((file) => {
				JSON.parse(file.toString()).forEach((elem) => tr.push(elem));
			});
			return tr;
		});
};
