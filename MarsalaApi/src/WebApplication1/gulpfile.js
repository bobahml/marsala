/// <binding BeforeBuild='copy-static' />
"use strict";

var typescript = require('gulp-typescript');
var gulp = require('gulp');
var clean = require('gulp-clean');

var destPath = './wwwroot/libs/';

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(destPath)
        .pipe(clean());
});

gulp.task("scriptsNStyles", () => {
    gulp.src([
            'core-js/client/**',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'angular2-cookie/**',
            'signalr/jquery.signalR.min.js',
            "jquery/dist/jquery.min.js",
            'bootstrap/dist/js/bootstrap.*js'
    ], {
        cwd: "node_modules/**"
    })
        .pipe(gulp.dest("./wwwroot/libs"));

    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css'
    ]).pipe(gulp.dest('./wwwroot/libs/css'));

    gulp.src([
		'node_modules/bootstrap/dist/fonts/*'
    ]).pipe(gulp.dest('./wwwroot/libs/fonts'));

});

var tsProject = typescript.createProject('app/tsconfig.json');
gulp.task('ts', function () {
    var tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('./wwwroot/app'));
});

gulp.task('watch', ['watch.ts']);

gulp.task('watch.ts', ['ts'], function () {
    return gulp.watch('app/*.ts', ['ts']);
});


gulp.task('watch-folder', function () {
    gulp.watch('./APP/**/*', ['copy-static']);
});


gulp.task("copy-static", function () {
    return gulp.src(['*.html', '*.css'], { cwd: "./app/**" })
    .pipe(gulp.dest('./wwwroot/app'));
});

gulp.task('default', ['scriptsNStyles', 'watch', 'copy-static']);