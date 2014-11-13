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
