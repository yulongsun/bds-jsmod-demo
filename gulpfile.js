

const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const srcCode = ['./lib/**/*.js'];
const mod = require('./lib/module');



//通地 gulp 调用将。。p写往到
gulp.task('setapis', function (cb) {
    mod.postApis();
});



// We do this over using include/exclude to make everything feel gulp-like!
gulp.task('doc', function (cb) {

    let config = require('./jsdocConfig');
    gulp.src(['README.md'].concat(srcCode), {read: false})
        .pipe(jsdoc(config, cb));
});

gulp.task('default', gulp.series( 'doc'))