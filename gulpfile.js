'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');
const plumber = require("gulp-plumber");
const autoprefixer = require('gulp-autoprefixer');
const notify = require("gulp-notify");
const gulpWebpack = require("gulp-webpack");
const webpackConfig = require("./webpack.config.js");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const paths = {
    // 'root': '../webpack-demo/',
    'cssSrc': './src/css/**/*.sass',
    'pug': './src/pug/*.pug',
    'cssDist': './src/build/css',
    'htmlDist': './src/build/html',
    'webpackSrc': './src/modules/*.ts',
}

const {watch, series, task, src, dest, parallel} = require('gulp');


//Webpack
task('webpack', function () {
    return (src(paths.webpackSrc)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(dest('./dist')));
});

//Sass
task('sass', function () {
    return (
        src(paths.cssSrc)
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(sass({
                outputStyle: 'expanded'// Minifyするなら'compressed'
            }))
            .pipe(autoprefixer({
                cascade: false,
                grid: true
            }))
            .pipe(dest(paths.cssDist))
    );
});


//Pug
task('pug', function () {
    return (
        src([paths.pug, '!./src/build/_*.pug'])
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
            .pipe(pug({
                    pretty: true,
                    basedir: './src/build/pug'
                }
                )
            )
            .pipe(dest(paths.htmlDist))
    );
});


// browser-sync
task('browser-sync', () => {
    return browserSync.init({
        server: {
            baseDir: paths.root
        },
        port: 8080,
        reloadOnRestart: true
    });
});

task('reload', (done) => {
    browserSync.reload();
    done();
});

task('watch', (done) => {
    watch([paths.cssSrc], series('sass', 'reload'));
    watch([paths.pug], series('pug', 'reload'));
    watch([paths.webpackSrc], series('webpack', 'reload'));
    done();
});


task('default', parallel('watch', 'browser-sync'));
