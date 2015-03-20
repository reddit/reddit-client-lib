'use strict';

var jshint = require('gulp-jshint');
var path = require('path');

module.exports = function(gulp, config) {
  gulp.task('jshint-sources', function() {
    return gulp.src(config.paths.sources)
      .pipe(jshint(path.join(config.paths.src, '.jshintrc')))
      .pipe(jshint.reporter('default'));
  });

  gulp.task('jshint-gulp', function() {
    return gulp.src(config.paths.gulp)
      .pipe(jshint(path.join(config.paths.root, '.jshintrc')))
      .pipe(jshint.reporter('default'));
  });

  gulp.task('jshint', ['jshint-sources', 'jshint-gulp']);
};
