var gulp = require('gulp');
var jshint = require('gulp-jshint');//make test
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var es = require('event-stream');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var gulpSequence = require('gulp-sequence');
var htmlreplace = require('gulp-html-replace');
var imagemin = require('gulp-imagemin');

gulp.task('jshint', function() {
  return gulp.src('./assets/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

gulp.task('compress', function (cb) {
	return es.merge([
      gulp.src([
        './node_modules/jquery/dist/jquery.min.js'
        ,'./node_modules/owl.carousel/dist/owl.carousel.min.js'
        ,'./node_modules/jquery-mask-plugin/dist/jquery.mask.min.js'
        ,'./node_modules/aos/dist/aos.js'
      ])
			,gulp.src('./assets/scripts/*.js').pipe(uglify())
		])
	    .pipe(concat('all.min.js'))
	    .pipe(gulp.dest('dist/assets/scripts'));
});

 
gulp.task('minify-images', function() {
	return gulp.src('assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'))
});

gulp.task('minify-css', function() {
  return gulp.src([
      './node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
      './node_modules/aos/dist/aos.css',
      './assets/styles/*.css'
    ])
  	.pipe(concat('all.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/assets/styles'));
});

gulp.task('htmlreplace', function() {
  return gulp.src('index.html')
    .pipe(htmlreplace({
        'css': 'assets/styles/all.min.css',
        'js': 'assets/scripts/all.min.js'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy', function() {
  return gulp.src(['assets/fonts/**/*']).pipe(gulp.dest('dist/assets/fonts'));
});


gulp.task('default', gulpSequence('jshint','clean',['htmlreplace','compress','minify-css','minify-images'])(function(){

  console.log('Build complete. Folder: \'/dist\'');

}));