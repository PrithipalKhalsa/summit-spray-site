'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var wait = require('gulp-wait');
gulp.task('sass', function(done) {
    gulp.src('src/components/*.sass')
        .pipe(wait(200))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/components/css'));
    done();
});