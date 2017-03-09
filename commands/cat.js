var fs = require('mz/fs');

module.exports = function(argv) {
	return Promise.all(argv.map((path) => fs.readFile(path)))
		.then((files) => {
			var tr = [];
			files.forEach((file) => {
				JSON.parse(file.toString()).forEach((elem) => tr.push(elem));
			});
			return tr;
		});
};
