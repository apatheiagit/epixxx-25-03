var gulp = require('gulp'),
	connect = require('gulp-connect'),
	opn = require('opn'),
	wiredep = require('wiredep').stream,
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css');

// bower
gulp.task('wiredep', function () { 
	gulp.src('app/*.html')
	.pipe(wiredep({
		directory: 'app/bower_components'
	}))
	.pipe(gulp.dest('app'));
});

// Запуск сервера
gulp.task('connect', function() {
	connect.server({
	root: 'app',
	livereload: true
	});
	opn('http://localhost:8080');
});

// Работа с html
gulp.task('html', function () {
	gulp.src('./app/*.html')
	.pipe(connect.reload());
});

// Слежка
gulp.task('watch', function () {
	gulp.watch(['./app/*.html'], ['html']);
});

// Задача по умолчанию
gulp.task('default', ['connect', 'watch']);

// build
gulp.task('dist', function () {
	var assets = useref.assets();

	return gulp.src('app/*.html')
	.pipe(assets)
	.pipe(gulpif('*.js', uglify()))
	.pipe(gulpif('*.css', minifyCss()))
	.pipe(assets.restore())
	.pipe(useref())
	.pipe(gulp.dest('dist'));
});