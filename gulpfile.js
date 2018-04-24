let spsave = require('gulp-spsave');
let gulp = require('gulp');
let changedInPlace = require('gulp-changed-in-place');

const src = "./src/**";
const tenant = "https://TENANT.sharepoint.com";

let devOptions = {
    siteUrl: tenant,
    notification: true,
    checkin: false,
    checkinType: 1,
    folder: 'Style Library',
    flatten: false,
};

let publishOptions = {
    siteUrl: tenant,
    notification: true,
    checkin: true,
    checkinType: 1,
    folder: 'Style Library',
    flatten: false,
};

const creds = {
    username: 'username@tenant.com',
    password: 'password',
};

gulp.task('default', function() {
    return gulp.src('./src/**')
        .pipe(spsave(devOptions, creds));
});

gulp.task('mindeploy', function() {
    return gulp.src('./src/**')
        .pipe(changedInPlace())
        .pipe(spsave(devOptions, creds));
});

gulp.task("watch", function() {
    gulp.watch(["./src/**"], ["mindeploy"]);
});

gulp.task("publish", function() {
    return gulp.src('./src/**')
        .pipe(spsave(publishOptions, creds));
})