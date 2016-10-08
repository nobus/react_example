'use strict';

const gulp = require('gulp'),
      run = require('gulp-run'),
      rigger = require('gulp-rigger'),
      react = require('gulp-react'),
      babel = require('gulp-babel'),
      cssmin = require('gulp-minify-css'),
      rimraf = require('rimraf'),
      browserSync = require('browser-sync'),
      reload = browserSync.reload;

const path = {
  src: {
    html: 'src/index.html',
    jsx: 'src/js/modules/*.jsx',
    js: 'src/js/main.js',
    style: 'src/css/weaver.css'
  },
  build: {
    html: 'build/',
    jsx: 'build/jsx/',
    js: 'build/js/',
    css: 'build/css/'
  },
  clean: './build'
};

const config = {
  server: {
    baseDir: 'build/'
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: 'React_Devil'
};

/**
 * Running webserver
 */
gulp.task('webserver', function () {
  browserSync(config);
});

/**
 * Running Bower
 */
gulp.task('bower', function() {
  run('bower install').exec();
});

gulp.task('build:html', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('build:jsx', function () {
  gulp.src(path.src.jsx)
    .pipe(react())
    .pipe(babel())
    .pipe(gulp.dest(path.build.jsx));
});

gulp.task('build:js', function () {
  gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('build:style', function () {
    gulp.src(path.src.style)
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'build:html',
    'build:style',
    'build:js'
]);

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});
