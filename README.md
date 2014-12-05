##Gulp Word Count

Gulp plugin for wordcount.

###Usage

````js
var wc = require('gulp-word-count');


gulp.task('wordcount', function() {
  var today = new Date();
  var datetime = [today.getDate(), today.getMonth() + 1, today.getFullYear()].join('_');

  return gulp.src('./book/**/*.md')
    .pipe(wc('wc_'+datetime+'.log'))
    .pipe(gulp.dest('./logs/');

});
````

### Todo

New options to implement:

* instead of just "file name", allow more option
* allow for console.logging wordcount and pushing through files
* allow for saving a file outside of the stream (sounds a little out of scope).
* allow for "minimum" wordcount requirement, colorize failure and colorize achievement


### Options

````
{
  file: 'filename',
  nanoMode: true, // for nano
  campNano: true, // for campnano
  start: 0, // wordcount start
  goal: 100000, // wordcount monthly goal
}
````
