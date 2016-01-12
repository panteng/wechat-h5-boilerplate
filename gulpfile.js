'use strict';

var autoprefixer = require('gulp-autoprefixer'),
    browserify = require('gulp-browserify'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    gulp = require('gulp'),
    inject = require('gulp-inject'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');



/* ============================================================================================================
============================================ For Development ==================================================
=============================================================================================================*/

// 将未经过压缩的app/dist/stylesheets/bundle.css和app/dist/javascript/bundle.js注入到app/source/index.html中，
// 并将结果保存至app/dist/index.html
gulp.task('inject', function () {
    var target = gulp.src('app/source/index.html');
    var sources = gulp.src([
        'app/dist/stylesheets/app.css',
        'app/dist/javascripts/bundle.js'
    ], {
        read: false
    });
    return target
        .pipe(inject(sources, {
            ignorePath: 'app/dist/',
            addRootSlash: false,
            removeTags: true
        }))
        .pipe(gulp.dest('app/dist'));
});

// 将app/source/fonts文件下的所有文件拷贝到app/dist/fonts，供生产环境使用
gulp.task('publish-fonts', function () {
    return gulp.src('app/source/fonts/*')
        .pipe(gulp.dest('app/dist/fonts'));
});

// 将app/source/images文件下的所有文件拷贝到app/dist/images，供生产环境使用
gulp.task('publish-images', function () {
    return gulp.src('app/source/images/*')
        .pipe(gulp.dest('app/dist/images'));
});

// 将app/source/audios文件下的所有文件拷贝到app/dist/audios，供生产环境使用
gulp.task('publish-audios', function () {
    return gulp.src('app/source/audios/*')
        .pipe(gulp.dest('app/dist/audios'));
});

// 将开发中需要用到的第三方样式表从node_modules中拷贝到app/source/sass/vendors中，并转换为.scss文件
gulp.task('get-css', function () {
    var stylesheets = [
        'node_modules/normalize.css/normalize.css',
        'node_modules/swiper/dist/css/swiper.css',
        'node_modules/animate.css/animate.css'
    ];

    return gulp.src(stylesheets)
        .pipe(rename({
            prefix: '_',
            extname: '.scss'
        }))
        .pipe(gulp.dest('app/source/sass/vendors'));
});

//  将sass（app/sass）编译为app/source/stylesheets/app.css
gulp.task('compile-sass', function () {
    return gulp.src('app/source/sass/main.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('app/dist/stylesheets'))
        .pipe(browserSync.stream());
});

// 使用browserify将所有CommonJS模块打包成一个文件app/dist/javascript/bundle.js
gulp.task('browserify', function () {
    return gulp.src('app/source/javascripts/main.js')
        .pipe(browserify({
            transform: ['partialify'],
            debug: true
        }))
        .on('error', function (err) {
            console.log(err.message);
            this.end();
        })
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('app/dist/javascripts'));
});

// 监控文件，当文件被创建、修改和删除时，自动执行相关的任务并刷新浏览器
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: 'app/dist'
        }
    });

    // 请使用相对路径, 否则当文件被创建或删除时gulp.watch不会被触发
    gulp.watch('app/source/index.html', ['inject']);
    gulp.watch('app/source/sass/**/*', ['compile-sass']);
    gulp.watch('app/source/javascripts/**/*', ['browserify']);
    gulp.watch('app/source/fonts/**', ['publish-fonts']);
    gulp.watch('app/source/images/**', ['publish-images']);
    gulp.watch('app/source/audios/**', ['publish-audios']);

    gulp.watch('app/dist/index.html').on('change', browserSync.reload);
    gulp.watch('app/dist/javascripts/*').on('change', browserSync.reload);
    gulp.watch('app/dist/fonts/*').on('change', browserSync.reload);
    gulp.watch('app/dist/images/*').on('change', browserSync.reload);
});

// 删除app/dist下的所有文件
gulp.task('clean-dist', function(cb) {
    return del([
        'app/dist/**/*'
    ], cb);
});

// 开发任务整合
gulp.task('dev', function (cb) {
    runSequence(['clean-dist', 'get-css'], ['publish-fonts', 'publish-images', 'publish-audios', 'compile-sass', 'browserify'], 'inject', 'watch', cb);
});

// 默认任务
gulp.task('default', ['dev']);



/* ============================================================================================================
================================================= For Production ==============================================
=============================================================================================================*/

// 压缩app/dist/stylesheets/bundle.css并将结果保存为app/dist/stylesheets/bundle.min.css，供生产环境使用
gulp.task('minify-css', function () {
    return gulp.src('app/dist/stylesheets/app.css')
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/dist/stylesheets'));
});

// 压缩app/dist/javascripts/bundle.js并将结果保存为app/dist/javascripts/bundle.min.js，供生产环境使用
gulp.task('uglify-js', function () {
    return gulp.src('app/dist/javascripts/bundle.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/dist/javascripts'));
});

// 将经过压缩的app/dist/stylesheets/bundle.min.css和app/dist/javascript/bundle.min.js注入到app/source/index.html中，
// 并将结果保存至 app/dist/index.html，供生产环境使用
gulp.task('inject-min', function () {
    var target = gulp.src('app/source/index.html');
    var sources = gulp.src([
        'app/dist/stylesheets/app.min.css',
        'app/dist/javascripts/bundle.min.js'
    ], {
        read: false
    });
    return target
        .pipe(inject(sources, {
            ignorePath: 'app/dist/',
            addRootSlash: false,
            removeTags: true
        }))
        .pipe(gulp.dest('app/dist'));
});

// 删除未经压缩的app/dist/stylesheets/bundle.css和app/dist/javascripts/bundle.js
gulp.task('del-bundle', function (cb) {
    return del([
        'app/dist/stylesheedts/app.css',
        'app/dist/javascripts/bundle.js'
    ], cb);
});

// 按步骤运行任务'minify-css'，'uglify-js'，'inject-min'和'del-bundle'任务，让项目为部署到生产环境做好准备
gulp.task('prod',  function (cb) {
    runSequence(['minify-css', 'uglify-js'], ['inject-min', 'del-bundle'], cb);
});
