/* gulpfile for React/NodeJS full-stack development.*/

const gulp = require('gulp');
const sass = require('gulp-sass');

const babelify = require('babelify');
const browserify = require('browserify');

const source = require('vinyl-source-stream');
const notify = require('gulp-notify');

const serverPort = process.env.PORT || 8080;

// Define paths for all source files here
const paths = {
    jsxDir: './client/jsx',
    client: ['./client/jsx/*.jsx', './client/**/*.js'],
    sass: ['./scss/*.*'],

    server: './server.js',
    serverIgnore: ['./gulpfile.js', './scss', './pug', './public', './build',
        './app/jsx', './app/common/ajax-functions.js'],

    tags: ['./client/**/*', './server/**/*', './pug/**/*', './scss/**/*'],

    test: ['./client/common/*.js', './test/*.js']

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

const browserifyOpts = {
    entries: paths.jsxDir + '/app.jsx',
    extensions: ['.jsx'],
    debug: true
};

//------------------
// PRODUCTION-tasks
//------------------

// Build the js
gulp.task('build-js', function() {
    return browserify(browserifyOpts)
        .transform(babelify)
        .bundle()
        .on('error', handleErrors)
        .pipe(source('./bundle.js'))
        .pipe(gulp.dest('build'))
        .pipe(notify('Build OK'));
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
// DEV-tasks
//--------------

if (process.env.NODE_ENV !== 'production') {

const browserifyInc = require('browserify-incremental');
const nodemon = require('gulp-nodemon');
const ctags = require('gulp-ctags');

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
            PORT: serverPort
        }
    })
    .on('start', function() {
        if (!called) {
            console.log('Server started on port ' + serverPort);
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

// Build all tests
gulp.task('build-test', function() {
    return browserify({entries:
        ['./client/common/ajax-functions.js', 'test/ajaxFunctionsTest.js'],
        extensions: ['.js'], debug: true})
        .transform(babelify)
        .bundle()
        .on('error', handleErrors)
        .pipe(source('./bundleTests.js'))
        .pipe(gulp.dest('build'));
});


// Incrementally building the js
gulp.task('build-js-inc', function() {
	var b = browserify(Object.assign({}, browserifyInc.args,
		browserifyOpts
	));

	browserifyInc(b, {cacheFile: './browserify-cache.json'});

	b.transform(babelify)
		.bundle()
        .on('error', handleErrors)
        .pipe(source('./bundle.js'))
        .pipe(gulp.dest('build'))
        .pipe(notify('Build OK'));
});

var watchDependents = [
    'build-js-inc',
    'tags',
    'build-sass'
];

gulp.task('watch-cli', watchDependents, function() {
    gulp.watch(paths.client, ['build-js-inc']);
    gulp.watch(paths.sass, ['build-sass']);
    gulp.watch(paths.tags, ['tags']);
});

gulp.task('watch-server', ['serve'], function() {
    gulp.watch(paths.server, ['serve']);
});

gulp.task('watch-test', ['build-test'], function() {
    gulp.watch(paths.test, ['build-test']);
});

gulp.task('watch', ['watch-cli', 'serve'], function() {
    gulp.watch(paths.server, ['serve']);
});

gulp.task('default', ['watch']);

} // if not in production
