const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const gulpSequence = require('gulp-sequence')
const replace = require('rollup-plugin-replace');
const eslint = require('gulp-eslint');


gulp.task('builddev', () => {
  return watch('./src/nodeuii/**/*.js', {
    ignoreInitial: false
  }, () => {
    gulp.src('./src/nodeuii/**/*.js') //编译nodeuii下面点所有js文件
      .pipe(babel({
        babelrc: false, //关闭外侧点src
        "plugins": ["transform-es2015-modules-commonjs"]
      }))
      .pipe(gulp.dest('dist'))
  })
});
gulp.task('buildpro', () => {
  gulp.src('./src/nodeuii/**/*.js') //编译nodeuii下面点所有js文件
    .pipe(babel({
      babelrc: false, //关闭外侧点src
      "plugins": ["transform-es2015-modules-commonjs"]
    }))
    .pipe(gulp.dest('dist'))
});
gulp.task('configclear', function () {
  gulp.src('./src/nodeuii/**/*.js')
    // transform the files here.
    .pipe(rollup({
      // any option supported by Rollup can be set here.
      output: {
        format: "cjs"
      },
      input: './src/nodeuii/config/index.js',
      plugins: [
        replace({
          "process.env.NODE_ENV": JSON.stringify('production')
        })
      ]
    }))
    .pipe(gulp.dest('./dist'));
});
gulp.task('lint', () => {
  gulp.src('./src/nodeuii/**/*.js')
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});
let _task = ["builddev"];

if (process.env.NODE_ENV === "production") {
  _task = gulpSequence('lint','buildpro', 'configclear') //异步的  还需要安装个队列sequence
}
if(process.env.NODE_ENV === 'lint'){
  _task = ['lint']

}
gulp.task("default", _task)