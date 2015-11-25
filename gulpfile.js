var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('less', function () {
  gulp.src('themes/default/resources/css/main.less')
    .pipe(less())
    .pipe(gulp.dest('themes/default/resources/css/'));
});

gulp.task('default', ['less']);
