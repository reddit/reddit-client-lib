'use strict';

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var path = require('path');

module.exports = function(gulp, config) {
  var bundler = browserify({
    entries: [
      path.join(config.paths.root, config.paths.entry),
    ],
    debug: true,
  });

  gulp.task('bundle', function() {
    return bundler
      .bundle()
      .pipe(source(config.fileName + '.js'))
      .pipe(gulp.dest(config.paths.dist));
  });

  gulp.task('uglify', ['bundle'], function() {

    var bundle = function() {
      return gulp
        .src(path.join(config.paths.dist, config.fileName + '.js'))
        .pipe(sourcemaps.init({ loadMaps: true }))
          // Add transformation tasks to the pipeline here.
          .pipe(uglify())
        .pipe(rename({
            extname: '.min.js',
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.dist));
    };

    return bundle();
  });
};
