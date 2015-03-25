var gulp = require('gulp'),
connect = require('gulp-connect');
opn = require('opn');

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