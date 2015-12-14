var gulp = require('gulp'),
    less = require('gulp-less'),
    rename= require('gulp-rename');

gulp.task('less', function () {
  gulp.src('themes/default/resources/css/_main.less')
    .pipe(less())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('themes/default/resources/css/'));
});

gulp.task('default', ['less']);
