const gulp = require('gulp'); //加载gulp插件
const gulpsass = require('gulp-sass'); //编译sass
const watch = require('gulp-watch'); //添加此插件进行监听

gulp.task('runsass', function () {
	return gulp.src('src/sass/*.scss')
		.pipe(gulpsass({
			outputStyle: 'expanded'
		})) //执行编译
		.pipe(gulp.dest('src/css/'));
});

gulp.task('default',function(){
	watch(['src/sass/*.scss'],gulp.parallel('runsass'));
});