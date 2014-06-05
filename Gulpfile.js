var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    notify  = require('gulp-notify'),
    min     = require('gulp-ngmin'),
    uglify  = require('gulp-uglify'),
    jshint  = require('gulp-jshint');

var paths = {
  ngLazy: [
    './src/ngLazy.js',
    './src/ngLazy_Directives.js',
    './src/ngLazy_Factories.js'
  ],
  dist: './dist/'
};

gulp.task('lint', function(){
  return gulp.src(paths.ngLazy)
    .pipe(jshint({
      globals: {
        'angular': true
      }
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify({message: 'Linting done'}));
});

gulp.task('concat', function(){
  return gulp.src(paths.ngLazy)
    .pipe(concat('ngLazy.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minify', function(){
  return gulp.src(paths.ngLazy)
    .pipe(concat('ngLazy.min.js'))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('preMin', ['minify'],function(){
  return gulp.src('./dist/ngLazy.min.js')
    .pipe(min())
    .pipe(gulp.dest(paths.dist))
    .pipe(notify({message: 'Min done'}));
});

gulp.task('uglify', ['preMin'],function(){
  return gulp.src('./dist/ngLazy.min.js')
   .pipe(uglify())
   .pipe(gulp.dest(paths.dist))
   .pipe(notify({message: 'Build Done'}));
});


gulp.task('build', ['lint', 'concat','uglify']);

gulp.task('watch', function(){
  gulp.watch(paths.ngLazy, ['build']);
});

gulp.task('default', ['build' ,'watch']);