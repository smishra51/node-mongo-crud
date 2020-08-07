import gulp from 'gulp';

import run from 'gulp-run';

gulp.task("test",()=> {
    console.log("executing test cases");
    return run('npm run test').exec();
})

function build() { 
    console.log("Packaging deployment file.");
    return run('npm pack').exec();
}

gulp.task('default', function () {
    console.log("Gulp is running");
});

function moveBuild() {
    return gulp.src('crud-1.0.1.tgz')
        .pipe(gulp.dest('build'))
}



export default gulp.series(build,moveBuild);
