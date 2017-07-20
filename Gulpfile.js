'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')
const jsmin = require('gulp-jsmin')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const vuecc = require('gulp-vuecc')
const sequence = require('gulp-sequence')
const trimLines = require('gulp-remove-empty-lines')
const wait = require('gulp-wait')
const standard = require('gulp-standard')
const format = require('gulp-standard-format')
const insert = require('gulp-insert')
const replace = require('gulp-replace')
const clean = require('gulp-rimraf')

const nmp = 'node_modules'

const distJS = [
  `${nmp}/jquery/dist/jquery.min.js`,
  `${nmp}/bootstrap/dist/js/bootstrap.min.js`,
  `${nmp}/vue/dist/vue.min.js`
]

const distCSS = [
  `${nmp}/bootstrap/dist/css/bootstrap.min.css`
]

gulp.task('dist-js', function () {
  return gulp.src(distJS)
  .pipe(gulp.dest('public/js/dist'))
})

gulp.task('dist-css', function () {
  return gulp.src(distCSS)
  .pipe(gulp.dest('public/css/dist'))
})

gulp.task('standard', function () {
  return gulp.src([
    '*.js',
    'api/*.js',
    'api/models/*.js',
    'clientside/*.js' // ,
    // 'clientside/controllers/*.ctrl.js'
  ])
  .pipe(standard())
  .pipe(standard.reporter('default', {
    breakOnError: true
  }))
})

gulp.task('controllers', function () {
  return gulp.src('clientside/controllers/*.vue.ts', { read: false })
  .pipe(vuecc({
    header: true,
    verbose: false,
    inputExt: '.vue.ts',
    outputExt: '.ctrl.js'
  }))
})

gulp.task('format', function () {
  return gulp.src('clientside/controllers/*.ctrl.js')
  .pipe(format())
  .pipe(replace(/(new Vue\(\{)/, 'v = $1'))
  .pipe(insert.prepend('/* global Vue */\n\'use strict\'\nfunction _ (v) {}\nlet v = null\n'))
  .pipe(insert.append('_(v)\n'))
  .pipe(gulp.dest('clientside/controllers'))
})

gulp.task('js', function () {
  return gulp.src('clientside/*.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe(jsmin())
  .pipe(trimLines())
  .pipe(gulp.dest('public/js'))
})

gulp.task('css', function () {
  return gulp.src('clientside/cruises.css')
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public/css'))
})

gulp.task('pause', function () {
  return gulp.src('*', { read: false })
  .pipe(wait(1500))
})

gulp.task('minify-controllers', function () {
  return gulp.src('clientside/controllers/*.ctrl.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe(jsmin())
  .pipe(trimLines())
  .pipe(gulp.dest('public/js'))
})

gulp.task('clean', function () {
  return gulp.src([
    'clientside/controllers/*.ctrl.js',
    'clientside/services/*.js',
    'public/js/dist/*.js',
    'public/js/*.js',
    'public/css/dist/*.css',
    'public/css/*.css'
  ])
  .pipe(clean())
})

gulp.task('default', sequence('dist-js', 'dist-css', 'js',
'controllers', 'pause', 'format', 'pause', 'minify-controllers', 'css', 'standard'))
