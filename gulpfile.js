var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var data = require('gulp-data');
var fs = require('fs');
var postcss = require('gulp-postcss');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('cssnano');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');

var paths = {
	sass: 'src/**/*.scss',
	js: 'src/js/script.js',
	data: 'data.json',
	jade: ['src/jade/index.jade','src/jade/privacypolicy.jade','src/jade/termsofservice.jade']
};

var processors = [require('postcss-focus'), cssnano ];

gulp.task('sass', function() {
	return (gulp
			.src('./src/scss/index.scss')
			.pipe(plumber({ errorHandler: notify.onError('Error: sass') }))
			.pipe(sass())
			.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
			// .pipe(concat('styles.css'))
			.pipe(postcss(processors))
			.pipe(cleanCss())
			.pipe(gulp.dest('dest/css'))
			.pipe(browserSync.stream()) );
});

gulp.task('jade', function() {
	return gulp
		.src(paths.jade)
		.pipe(plumber({ errorHandler: notify.onError('Error: jade') }))
		.pipe(
			data(function(file) {
				return JSON.parse(fs.readFileSync(paths.data));
			})
		)
		.pipe(jade())
		.pipe(gulp.dest('dest'))
		.pipe(browserSync.stream());
});

gulp.task('js', function() {
	return gulp.src(paths.js).pipe(plumber()).pipe(gulp.dest('dest/js')).pipe(browserSync.stream());
});

gulp.task('serve', [ 'sass', 'jade', 'js' ], function() {
	browserSync.init({
		server: './dest'
	});

	gulp.watch(paths.sass, [ 'sass' ]).on('change', browserSync.reload);
	gulp.watch(['dest/js/*.js', paths.js], [ 'js' ]).on('change', browserSync.reload);
	gulp.watch('src/**/*.jade', [ 'jade' ]).on('change', browserSync.reload);
	gulp.watch('dest/*.html', [ 'jade' ]).on('change', browserSync.reload);
});

gulp.task('default', [ 'js', 'jade', 'sass', 'serve' ]);
