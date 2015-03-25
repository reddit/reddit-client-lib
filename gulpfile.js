'use strict';

var glob = require('glob');
var gulp = require('gulp');
var del = require('del');

var pkg = require('./package.json');

var config = {
  fileName: pkg.name,
  version: pkg.version,
  repository: pkg.repository,
  paths: {
    root: __dirname,
    entry: 'src/tracking.js',
    sources: [
      'src/tracking.js',
      'src/**/*.js',
      '!src/**/*-commonjs.js',
    ],
    gulp: [
      'gulpfile.js',
      'gulp/*.js',
    ],
    src: 'src/',
    tmp: 'build/',
    dist: 'dist/',
  },
};

glob.sync('./gulp/*.js').forEach(function(path) {
  var task = require('./' + path);
  task(gulp, config);
});

gulp.task('clean:dist', function(cb) {
  del(['dist/**'], cb);
});

gulp.task('lint', [
  'jscs',
  'jshint',
]);

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['default']);
});

gulp.task('default', [
  'clean:dist',
  'lint',
  'uglify',
]);
