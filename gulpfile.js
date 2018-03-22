var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var data = require('gulp-data');
var fs = require('fs');

var paths = {
	sass: 'src/scss/*.scss',
	js: 'src/js/*.js',
	data: './data.json',
	jade: 'src/jade/index.jade'
};

gulp.task('jade', function() {
	return gulp
		.src(paths.jade)
		.pipe(
			data(function(file) {
				return JSON.parse(fs.readFileSync(paths.data));
			})
		)
		.pipe(jade())
		.pipe(plumber())
		.pipe(gulp.dest('dest'))
		.pipe(browserSync.stream());
});

gulp.task('sass', function() {
	return gulp.src(paths.sass).pipe(sass()).pipe(plumber()).pipe(gulp.dest('dest/css')).pipe(browserSync.stream());
});

gulp.task('js', function() {
	return gulp.src(paths.js).pipe(plumber()).pipe(gulp.dest('dest/js')).pipe(browserSync.stream());
});

gulp.task('serve', [ 'sass', 'jade', 'js' ], function() {
	browserSync.init({
		server: './dest'
	});

	gulp.watch(paths.sass, [ 'sass' ]).on('change', browserSync.reload);
	gulp.watch(paths.js, [ 'js' ]).on('change', browserSync.reload);
	gulp.watch('src/**/*.jade', [ 'jade' ]).on('change', browserSync.reload);
	gulp.watch('dest/*.html', [ 'jade' ]).on('change', browserSync.reload);
});

gulp.task('default', [ 'js', 'jade', 'sass', 'serve' ]);
