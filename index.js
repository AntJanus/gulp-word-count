var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

module.export = function(file, opt) {
  var total = 0;

	function bufferContents(file, enc, cb) {
    var wordCount = 0;

    if(file.isBuffer()) {


      total += wordCount;
    }
	}

	function endStream() {
    console.log(total);

    this.emit('data', total);
		this.emit('end');
	}

  return through(bufferContents, endStream);
};
