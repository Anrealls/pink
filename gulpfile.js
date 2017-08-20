'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var rename = require("gulp-rename");
var clean = require('gulp-clean');

const imagemin = require('gulp-imagemin');
var svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');

var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var run = require('run-sequence');
var del = require('del');





gulp.task('serve', ['style'], function() {

    browserSync.init({
        server: "."
    });
    gulp.watch("sass/**/*.scss", ['style']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task("style", function () {
    gulp.src("sass/style.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer({browsers: [
                "last 1 version",
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 Opera versions",
                "last 2 Edge versions"
            ]}),
            mqpacker({
                sort: true
            })
        ]))
        .pipe(gulp.dest("css"))
        .pipe(csso())
        .pipe(browserSync.stream())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("css"))
});


gulp.task('svg', function () {
    return gulp.src('img/icons/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg",
                    render: {
                        scss: {
                            dest:'../../sass/_sprite.scss',
                            template: "sass/_sprite_template.scss"
                        }
                    }
                }
            }
        }))
        .pipe(gulp.dest('img'));
});



gulp.task("build", function (fn) {
    run(
        "svg",
        "clean",
        "copy",
        "style_build",
        "images",
        fn
    );
});
gulp.task("style_build", function () {
    gulp.src("sass/style.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer({browsers: [
                "last 1 version",
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 Opera versions",
                "last 2 Edge versions"
            ]}),
            mqpacker({
                sort: true
            })
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(csso())
        .pipe(browserSync.stream())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
});
gulp.task("copy", function () {
    return gulp.src([
        "fonts/**/*.{woff,woff2}",
        "img/**",
        "js/**",
        "*.html"
    ], {
        base: "."
    })
        .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
    return del("build");
});


gulp.task("images", function () {
    return gulp.src("build/img/**/*.{png,jpg}")
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
        ]))
        .pipe(gulp.dest("build/img"))
});

