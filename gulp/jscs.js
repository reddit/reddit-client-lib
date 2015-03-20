'use strict';

var jscs = require('gulp-jscs');

module.exports = function(gulp, config) {
  gulp.task('jscs', function() {
    return gulp.src([].concat(
      config.paths.gulp,
      config.paths.sources
    )).pipe(jscs());
  });
};
