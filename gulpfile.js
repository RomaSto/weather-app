

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    del         = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename");


gulp.task('sass', function () {
    return gulp.src('./src/sass/*.sass')
        .pipe(sass({}).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('clean', function() {
    return del.sync('dist/*');
});


gulp.task('build', ['sass','clean'], function() {

    var buildCss = gulp.src('src/css/*.css')
    .pipe(gulp.dest("dist/css"))

    var buildJs = gulp.src('src/js/**/*')
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});
gulp.task('watch', ['sass', 'browser-sync'], function() {
	gulp.watch('src/sass/*.sass', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/*.js', browserSync.reload);
});

gulp.task('clear', function () {
    return cache.clearAll();
})
gulp.task('default', ['watch']);
