var through     = require('through2');
var gutil       = require('gulp-util');
var wc          = require('wordcount');
var PluginError = gutil.PluginError;
var File        = gutil.File;
var path        = require('path');

module.exports = function(logName) {
  var total = 0;
  var firstFile;

  if(typeof logName === 'Object') {

  }

	function bufferContents(file, enc, cb) {
    var wordCount = 0;

    if (file.isNull()) return;
    if (file.isStream()) return this.emit('error', new PluginError('gulp-wordcount', 'Streaming not supported'));

    if(!firstFile) firstFile = file;

    wordCount = wc(file.contents.toString());

    total += wordCount;
    cb();
	}

	function endStream(cb) {

     if (firstFile) {

      var joinedFile = new File({
        base: firstFile.base,
        cwd: firstFile.cwd,
        path: path.join(firstFile.base, logName),
        contents: new Buffer(total.toString())
      });

      this.push(joinedFile);
      return cb();
    }

     return cb();
	}

  return through.obj(bufferContents, endStream);
};
