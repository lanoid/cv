const gulp = require('gulp');
const gulpLess = require('gulp-less');
const gulpCopy = require('gulp-copy');
const browserSync = require('browser-sync').create();
const path = require('path');

const paths = {
  lessFiles: 'src/less/*.less',
  lessBuildFiles: 'src/less/_*.less',
  serve: 'serve/',
  files: ['src/index.html', 'src/css/*.css', 'src/fonts/socicon/socicon-webfont.*', 'src/images/*', 'src/favicon.*', '!serve/']
}

function styles() {
  return gulp.src([paths.lessFiles, `!${paths.lessBuildFiles}`])
    .pipe(gulpLess({
      paths: [path.join(__dirname, '.', 'fonts/socicon')],
      javascriptEnabled: true
    }))
    .pipe(gulp.dest('src/css'));
}

function watch() {
  gulp.watch(paths.lessFiles, gulp.series(styles, build));
}

function build() {
  return gulp.src(paths.files)
    .pipe(gulpCopy(paths.serve, { prefix: 1 }));
}

function cssReload(done) {
  return gulp.src(`${paths.serve}/css/*`)
    .pipe(browserSync.stream());
}

function dev() {

  browserSync.init({
    server: {
      baseDir: paths.serve
    },
    files: paths.files,
    injectChanges: true,
    reloadOnRestart: true,
    notify: false
  });

  gulp.watch(paths.lessFiles, gulp.series(styles, build, cssReload));
  gulp.watch(paths.files).on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('build', build);
gulp.task('dev', dev);
gulp.task('cssReload', cssReload);

gulp.task('default', gulp.series(watch));
