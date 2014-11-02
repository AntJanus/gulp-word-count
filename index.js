var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

module.export = function(file, opt) {


	function bufferContents(file) {

	}

	function endStream() {
    this.emit('data');

		this.emit('end');
	}

  return through(bufferContents, endStream);
};
