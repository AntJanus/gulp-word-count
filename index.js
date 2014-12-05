var through     = require('through2');
var gutil       = require('gulp-util');
var wc          = require('wordcount');
var PluginError = gutil.PluginError;
var File        = gutil.File;
var path        = require('path');

module.exports = function(options) {
  var total = 0;
  var firstFile;

  var processOptions = function(opts) {
    var today = new Date();

    if(opts.nanoMode || opts.campNano) {
      var datetime = [today.getMonth() + 1, today.getDate(), today.getFullYear()].join('_');
      var daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

      opts.goal = opts.goal || 50000;
      opts.start = opts.start || 0;
      opts.dailyGoal = opts.dailyGoal || Math.ceil((opts.goal - opts.start) / daysInMonth);
      opts.todayGoal = opts.start + (opts.dailyGoal * today.getDate());

      if(opts.campNano) {
        opts.file = opts.file || 'camp-' + datetime + '.log';
      } else if(opts.nanoMode) {
        opts.file = opts.file || 'nano-' + datetime + '.log';
      }
    }

    return opts;
  }

  var useOptions = function(opts, total) {
    //emit count
    gutil.log('Your count: ' + total);
    if(opts.todayGoal) {
      if(total > opts.todayGoal) {
        gutil.log(gutil.colors.cyan('Congrats! You\'ve made it!'));
      } else {
        var toGo = opts.todayGoal - total;
        gutil.log(gutil.colors.magenta('You still have: ' + toGo + ' to go'));
      }
    }
  }

  options = processOptions(options);

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

    useOptions(options, total);

    if (firstFile) {
      var joinedFile = new File({
        base: firstFile.base,
        cwd: firstFile.cwd,
        path: path.join(firstFile.base, options.file),
        contents: new Buffer(total.toString())
      });

      this.push(joinedFile);
      return cb();
    }

     return cb();
  }

  return through.obj(bufferContents, endStream);
};
