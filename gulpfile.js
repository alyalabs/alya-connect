import { src, dest, parallel, series, watch, task } from 'gulp'

function copyTo() {
  return src([
    './**/*.js',
  ])
    .pipe(dest('../alya-s7/backend/node_modules/alya-connect/dist'))
}

task('dev', series(
  copyTo,
  function () {
    watch([
      './dist/*.js',
    ], series(
      copyTo
    ))
  }
))