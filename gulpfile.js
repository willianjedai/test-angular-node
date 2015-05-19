'use restrict';

var gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  sourcemaps = require('gulp-sourcemaps'),
  plumber = require('gulp-plumber'),
  jade = require('gulp-jade'),
  nodemon = require('gulp-nodemon'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync').create(),
  del = require('del'),
  path = require('path'),
  folder = {
    client: './client',
    dist: './dist',
    stylus: 'code/stylus/**/*.styl',
    css: 'css',
    js: 'code/js/**/*.js',
    jsDist: 'js',
    jade: 'views/**/*.jade',
    html: '.',
    server: 'server',
    bower: './client/bower_components'
  },
  bower = {
    js: path.join(folder.bower, 'angular/angular.min.js')
  };

// CSS builder
gulp.task('cssCompiler', function() {
  gulp.src( path.join( folder.client, folder.stylus ) )
    .pipe( plumber() )
    .pipe( sourcemaps.init() )
    .pipe( stylus() )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( path.join( folder.dist, folder.css ) ) )
    .pipe( browserSync.reload( { stream: true } ) );
});
gulp.task('cssCompress', function() {
  gulp.src( path.join( folder.client, folder.stylus ) )
    .pipe( stylus({ compress: true }) )
    .pipe( gulp.dest( path.join( folder.dist, folder.css ) ) );
});

// JS builder
gulp.task('jsCompiler', function() {
  gulp.src( [bower.js, path.join( folder.client, folder.js )] )
    .pipe( plumber() )
    .pipe( sourcemaps.init() )
    .pipe( concat( 'all.js' ) )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( path.join( folder.dist, folder.jsDist ) ) )
    .pipe( browserSync.reload( { stream: true } ) );
});

// Jade builder
gulp.task( 'jadeCompiler', function() {
  gulp.src( path.join( folder.client, folder.jade ) )
    .pipe( plumber() )
    .pipe( jade() )
    .pipe( gulp.dest( path.join( folder.dist, folder.html ) ) )
    .pipe( browserSync.reload( { stream: true } ) );
} );

// Clean dist folder
gulp.task('clean', function() {
  del( folder.dist );
});

// Static server
gulp.task('browser-sync', [ 'jadeCompiler', 'cssCompiler', 'jsCompiler' ], function() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });

  nodemon({
    script: './server/app.js', 
    ext: 'js',
    ignore: [ path.join( folder.client, folder.js ), 'node_modules/**/*' ],
    env: { 'NODE_ENV': 'development' }
  });

  gulp.watch( path.join( folder.client, folder.stylus ), ['cssCompiler'] );
  gulp.watch( path.join( folder.client, folder.jade ), ['jadeCompiler'] );
  gulp.watch( path.join( folder.client, folder.js ), ['jsCompiler'] );
});


// Tasks
gulp.task('default', ['clean'], function() {
  gulp.start('browser-sync');
});
gulp.task('deploy', ['clean', 'cssCompress', 'jadeCompiler', 'jsCompiler']);