var argv = process.argv.slice(2);
var command = argv[0];
try {
	var module = require('./commands/'+command);
} catch(e) {
	if(e.code === "MODULE_NOT_FOUND") {
		console.error("No such command.");
		process.exit(-4);
	}
	console.error(e);
	process.exit(1);
}
module(argv.slice(1)).then((content) => {
	console.log(JSON.stringify(content));
});
