
var gulp = require('gulp');
var sass = require('gulp-sass');

var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');

var jsxDir = './client/jsx';

var port = process.env.PORT || 8080;

// Define paths for all source files here
var paths = {
    client: ['./client/jsx/*.jsx', './client/**/*.js'],
    sass: ['./scss/*.*'],

    server: './server.js',
    serverIgnore: ['./gulpfile.js', './scss', './pug', './public', './build',
        './app/jsx', './app/common/ajax-functions.js'],

    tags: ['./client/**/*', './server/**/*', './pug/**/*', './scss/**/*']

};


/* Used to notify on build/compile errors.*/
function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
      notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
      }).apply(this, args);
      this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('build-js', function() {
    return browserify({entries: jsxDir + '/app.jsx',
        extensions: ['.jsx'], debug: true})
        .transform(babelify)
        .bundle()
        .on('error', handleErrors)
        .pipe(source('./bundle.js'))
        .pipe(gulp.dest('build'))
        .pipe(notify('Build OK'));
});

gulp.task('build-test', function() {
    return browserify({entries:
        ['./client/common/ajax-functions.js', 'test/ajaxFunctionsTest.js'],
        extensions: ['.js'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('./bundleTests.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('build-sass', function() {
    return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build'));

});

var buildTasks = ['build-js', 'build-sass'];

gulp.task('build', buildTasks, function() {
    console.log('Building the application.');
});


//--------------
// DEV-section
//--------------

if (process.env.NODE_ENV !== 'production') {

var nodemon = require('gulp-nodemon');
var ctags = require('gulp-ctags');

gulp.task('tags', function() {
  return gulp.src(paths.tags)
    .pipe(ctags({name: 'tags'}))
    .pipe(gulp.dest('./'));
});

/* Task for starting/restarting server on any changes.*/
gulp.task('serve', function(cb) {
    var called = false;
    nodemon({
        script: paths.server,
        ext: '.js',
        ignore: paths.serverIgnore,
        env: {
            NODE_ENV: process.env.NODE_ENV || 'development',
            DEBUG: process.env.DEBUG || 0,
            PORT: port
        }
    })
    .on('start', function() {
        if (!called) {
            console.log('Server started on port ' + port);
            called = true;
            cb();
        }
    })
    .on('restart', function(files) {
        if (files) {
            console.log('Nodemon will restart due to changes in: ', files);
        }
    });
});

var watchDependents = [
  'build-js',
  'tags',
  'build-sass'
];

gulp.task('watch-cli', watchDependents, function() {
    gulp.watch(paths.client, ['build-js']);
    gulp.watch(paths.sass, ['build-sass']);
    gulp.watch(paths.tags, ['tags']);
});

gulp.task('watch', ['watch-cli', 'serve'], function() {
    gulp.watch(paths.server, ['serve']);
});

gulp.task('default', ['watch']);

} // if not in production
