const gulp = require('gulp'); //加载gulp插件
const gulpsass = require('gulp-sass'); //编译sass
const html = require('gulp-minify-html'); //压缩html
const css = require('gulp-minify-css'); //压缩css
const uglify = require('gulp-uglify'); //压缩js
const rename = require('gulp-rename'); //重命名
const imagemin = require('gulp-imagemin'); //图片压缩插件
const watch = require('gulp-watch'); //添加此插件进行监听

//编译sass
gulp.task('runsass', function () {
	return gulp.src('src/sass/*.scss')
		.pipe(gulpsass({
			outputStyle: 'expanded'
		})) //执行编译
		.pipe(gulp.dest('src/css/'));
});

//压缩html
gulp.task('uglifyhtml', function () {
	return gulp.src('src/*.html')
		.pipe(html()) //执行压缩
		.pipe(gulp.dest('dist/src'));
});

//压缩css
gulp.task('uglifycss', function () {
	return gulp.src('src/css/*.css')
		.pipe(css()) //执行压缩
		.pipe(gulp.dest('dist/src/css'));
});


// // 压缩js
// gulp.task('uglifyjs',function(){
// 	return gulp.src('src/script/js/*.js')
// 	.pipe(uglify())//压缩
// 	.pipe(gulp.dest('dist/src/script/js'));
// });

// 图片的压缩--png
gulp.task('runimg',function(){
	return gulp.src('src/img/*.png')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/src/img/'));
});

// 监听
// gulp.task('default',function(){
// 	watch(['src/*.html','src/sass/*.scss','src/js/*.js'],gulp.parallel('uglifyhtml','runsass','uglifyjs'));  
// });