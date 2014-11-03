var through     = require('through2');
var gutil       = require('gulp-util');
var wc          = require('wordcount');
var PluginError = gutil.PluginError;

module.export = function(file, opt) {
  var total = 0;
  var firstFile;

	function bufferContents(file, enc, cb) {
    var wordCount = 0;

    if(file.isBuffer()) {
      if (!firstFile) firstFile = file;

      wordcount = wc(string(file.contents));

      total += wordCount;
    }
	}

	function endStream() {

     if (firstFile) {
      var joinedFile = firstFile;

      if (typeof file === 'string') {
        joinedFile = firstFile.clone({contents: false});
        joinedFile.path = path.join(firstFile.base, file);
      }

      joinedFile.contents = new Buffer(total);

      this.emit('data', joinedFile);
    }

   console.log(total);

		this.emit('end');
	}

  return through(bufferContents, endStream);
};
