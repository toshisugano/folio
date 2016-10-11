var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect'); 
var sass = require('gulp-sass');


gulp.task('default', ['connect', 'watch']);

gulp.task('connect', function() {
	connect.server({
		root: './dist',
		livereload : true,
		port : 3000
	});
});

 // Concatenate & Minify JS
gulp.task('scripts', function() { 
    return gulp.src('src/scripts/*.js')
        //.pipe(concat('main.js'))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(connect.reload());
});

gulp.task('html', function() { 
    return gulp.src('src/*.html') 
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('images', function() {
    return gulp.src('src/images/*.{jpg,gif}')
        .pipe(gulp.dest('dist/images'))
        .pipe(connect.reload());
}); 

gulp.task('json', function() {
    return gulp.src('src/json/*.json')
        .pipe(gulp.dest('dist/json'))
        .pipe(connect.reload());
});

gulp.task('templates', function() {
    return gulp.src('src/templates/*.{txt,json}')
        .pipe(gulp.dest('dist/templates'))
        .pipe(connect.reload());
}); 

gulp.task('css', function() { 
    return gulp.src('src/sass/*.scss')
        .pipe(sass()) 
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(['./src/scripts/*.js'], ['scripts']);
    gulp.watch(['./src/sass/*.scss'], ['css']);
    gulp.watch(['./src/*.html'], ['html']);
    gulp.watch(['./src/images/*.{jpg,gif}'], ['images']); 
    gulp.watch(['./src/json/*.json'], ['json']);
    gulp.watch(['./src/templates/*.{txt,json}'], ['templates']);
});

