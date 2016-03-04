//tell nodejs that it needs to look for gulp in the same folder
  var gulp = require('gulp');
  var sass = require('gulp-sass');
  var jshint = require('gulp-jshint');

//tell fulp what does it need to do
gulp.task('jshint', function(){
    return gulp.src('js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

  //tell gulp to compile sass files to css
  gulp.task('sass', function() {
    return gulp.src('css/style.scss')
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(gulp.dest('css/'))
  });

  //wahcher for sass and jshint
  gulp.task('watch', function(){
    gulp.watch('css/*.scss', ['sass']);
    gulp.watch('js/*.js', ['jshint']);
  });

