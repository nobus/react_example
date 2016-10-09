'use strict';

const gulp = require('gulp'),
      run = require('gulp-run'),
      react = require('gulp-react'),
      babel = require('gulp-babel'),
      cssmin = require('gulp-minify-css'),
      concat = require('gulp-concat'),
      newer = require('gulp-newer'),
      rimraf = require('rimraf'),
      del = require('del'),
      browserSync = require('browser-sync'),
      reload = browserSync.reload;

const path = {
  src: {
    jsx: 'src/jsx/*.jsx',
    html: 'src/index.html',
    react: 'bower_components/react/react.js',
    reactDom: 'bower_components/react/react-dom.js',
    js: 'src/js/main.js',
    style: 'src/css/weaver.css'
  },
  build: {
    html: 'build/',
    react: 'build/js/react.js',
    reactDom: 'build/js/react-dom.js',
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
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('copy:react', function () {
  gulp.src(path.src.react)
    .pipe(newer(path.build.react))
    .pipe(gulp.dest(path.build.js))
});

gulp.task('copy:react-dom', function () {
  gulp.src(path.src.reactDom)
    .pipe(newer(path.build.reactDom))
    .pipe(gulp.dest(path.build.js))
});

gulp.task('build:jsx', function () {
  gulp.src(path.src.jsx)
    .pipe(react())
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(path.build.js));
});

gulp.task('build:js', [
  'copy:react',
  'copy:react-dom',
  'build:jsx'
]);

gulp.task('build:style', function () {
  gulp.src(path.src.style)
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.style))
    .pipe(reload({stream: true}));
});

gulp.task('clean', function () {
  del([path.build.html]);
});

gulp.task('build', [
  'build:html',
  'build:style',
  'build:js'
]);

gulp.task('default', ['build', 'webserver']);
