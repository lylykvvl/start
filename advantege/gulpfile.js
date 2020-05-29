let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync')
    autoprefixer = require('gulp-autoprefixer')
;

gulp.task('sass', function(){
    return gulp.src('app/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 version']
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('html', function(){
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    })
});


gulp.task('watch', function(){
    gulp.watch('app/scss/style.scss', gulp.parallel('sass'));
   gulp.watch('app/*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('sass','watch', 'browser-sync'));