'use strict';

const gulp = require('gulp'),
      run = require('gulp-run'),
      rigger = require('gulp-rigger'),
      react = require('gulp-react'),
      babel = require('gulp-babel'),
      cssmin = require('gulp-minify-css'),
      rimraf = require('rimraf'),
      del = require('del'),
      browserSync = require('browser-sync'),
      reload = browserSync.reload;

const path = {
  src: {
    jsx: 'src/jsx/*.jsx',
    html: 'src/index.html',
    js: 'src/js/main.js',
    style: 'src/css/weaver.css'
  },
  build: {
    jsx: 'src/js/modules/',
    html: 'build/',
    js: 'build/js/',
    style: 'build/css/'
  }
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
    .pipe(gulp.dest(path.build.style))
    .pipe(reload({stream: true}));
});

gulp.task('clean', function () {
    del([path.build.jsx, path.build.html]);
});

gulp.task('build', [
    'build:html',
    'build:style',
    'build:js'
]);

gulp.task('default', ['build', 'webserver']);
