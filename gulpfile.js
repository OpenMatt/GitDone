'use strict';

var gulp = require('gulp');
var zip = require('gulp-zip');

var files = ['manifest.json', 'scripts/*.js'];
var xpiName = 'gitdone.xpi';

gulp.task('zip', function () {
  return gulp.src(files, {base: "."})
    .pipe(zip(xpiName))
    .pipe(gulp.dest('dist'));
});

gulp.task("default", ["zip"]);
