/// <reference path="gulpfile.d.ts" />

import source from 'vinyl-source-stream';
import gulp from 'gulp';
import rename from 'gulp-rename';
import streamify from 'gulp-streamify';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import tsify from 'tsify';
import exorcist from 'exorcist';
import fs from 'fs';

const DEBUG = process.env.NODE_ENV !== 'production';

gulp.task('lib', () => {
    const b = browserify();

    b.require('jquery');
    b.require('angular');
    b.require('@uirouter/angularjs');

    // generate globals entry file
    fs.writeFileSync('./build/globals.js', 'window.$ = window.jQuery = require(\'jquery\');\n');
    b.add('./build/globals.js');

    return b.bundle()
        .pipe(source('lib.bundle.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(streamify(uglify()))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('browserify', (done) => {
    const b = browserify({
        entries: './src/app/index.ts',
        debug: DEBUG,
    });

    // plugins
    b.plugin(tsify);

    // build environment configuration file
    const base = require('./env/env.json');
    const env = require(`./env/env.${DEBUG ? 'dev' : 'prod'}.json`);
    const json = JSON.stringify(Object.assign(base, env));
    fs.writeFileSync('./build/env.json', json);

    b.require('./build/env.json', { id: '@env' });

    // generate pages module
    const dir = './src/app/pages';
    const pages = 'var pages = [];\n' +
        fs.readdirSync(dir, { withFileTypes: true })
            .filter(entry => entry.isDirectory())
            .map(entry => `../${dir}/${entry.name}`)
            .map(path => `pages.push(require('${path}').default);`)
            .join('\n')
        + '\nmodule.exports = pages;\n';
    fs.writeFileSync('./build/pages.js', pages);
    b.require('./build/pages.js', { id: '@pages' });

    // declare external dependencies
    b.external([
        'angular',
        'jquery',
        '@uirouter/angularjs',
    ]);

    // gulp pipeline
    return b.bundle().on('error', done)
        .pipe(exorcist('dist/bundle.js.map'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(streamify(uglify()))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist/'));
});

// todo: watchify
gulp.task('build', gulp.task('browserify'));
gulp.task('default', gulp.task('build'));
gulp.task('watch', gulp.series(gulp.task('build'), () => {
    const globs = [
        'src/**/*.ts',
        'env/*',
    ];
    return gulp.watch(globs, gulp.task('build'));
})
);
