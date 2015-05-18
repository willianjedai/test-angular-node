'use restrict';

var gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  sourcemaps = require('gulp-sourcemaps'),
  plumber = require('gulp-plumber'),
  jade = require('gulp-jade'),
  browserSync = require('browser-sync').create(),
  del = require('del'),
  path = require('path'),
  nodemon = require('nodemon'),
  folder = {
    base: './client',
    dist: './dist',
    stylus: 'code/stylus/**/*.styl',
    css: 'css',
    jade: 'views/**/*.jade',
    html: '.'
  };

// CSS builder
gulp.task('cssCompiler', function() {
  gulp.src( path.join( folder.base, folder.stylus ) )
    .pipe( plumber() )
    .pipe( sourcemaps.init() )
    .pipe( stylus() )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( path.join( folder.dist, folder.css ) ) )
    .pipe( browserSync.reload( { stream:true } ) );
});
gulp.task('cssCompress', function() {
  gulp.src( path.join( folder.base, folder.stylus ) )
    .pipe( stylus({ compress: true }) )
    .pipe( gulp.dest( path.join( folder.dist, folder.css ) ) );
});

// JS builder


// Jade builder
gulp.task( 'jadeCompiler', function() {
  gulp.src( path.join( folder.base, folder.jade ) )
    .pipe( plumber() )
    .pipe( jade() )
    .pipe( gulp.dest( path.join( folder.dist, folder.html ) ) )
    .pipe( browserSync.reload( { stream:true } ) );
} );

// Clean dist folder
gulp.task('clean', function() {
  gulp.del( folder.dist );
});

// Static server
gulp.task('browser-sync', ['jadeCompiler', 'cssCompiler'], function() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });

  gulp.watch( path.join( folder.base, folder.stylus ), ['cssCompiler'] );
  gulp.watch( path.join( folder.base, folder.jade ), ['jadeCompiler'] );
});


// Tasks
gulp.task('default', ['clean'], function() {
  gulp.start('browser-sync');
});
gulp.task('deploy', ['clean', 'cssCompress', 'jadeCompiler']);