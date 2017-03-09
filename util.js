var fs = require('mz/fs');
module.exports = {
	readFile(filename) {
		if(filename === "-") {
			return new Promise((resolve, reject) => {
				var content = "";
				process.stdin.on('data', (chunk) => {
					content += chunk;
				});
				process.stdin.on('end', () => {
					resolve(content);
				});
			});
		}
		else {
			return fs.readFile(filename);
		}
	}
};
