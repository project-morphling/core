const path = require('path');
const {argv} = require('yargs');

exports.environment = argv.env || process.env.NODE_ENV || 'production';
exports.watch = !!argv.env && 'watch' in argv.env;
exports.dev = exports.watch || exports.environment === 'development';
exports.min = (argv.env && 'min' in argv.env) || !exports.dev;

console.log(`environment = ${exports.environment }`);
console.log(`dev = ${exports.dev }`);
console.log(`min = ${exports.min }`);
console.log(`watch = ${exports.watch }`);

exports.paths = {};
exports.paths.root = path.join(__dirname, '..');
exports.paths.src = path.join(exports.paths.root, 'src');
exports.paths.dist = path.join(exports.paths.root, 'dist');
exports.paths.release = path.join(exports.paths.root, 'release');

exports.paths.scripts = path.join(exports.paths.src, 'scripts');
exports.paths.styles = path.join(exports.paths.src, 'styles');

exports.paths.aliases = {
    'root': exports.paths.root
};

exports.host = 'localhost';
exports.port = 1337;