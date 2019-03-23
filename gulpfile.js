// -----------------------------------------------------
// Requires
// -----------------------------------------------------
var chalk = require('chalk');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var jsonMinify = require('gulp-jsonminify');
var less = require('gulp-less');
var log = require('fancy-log');
var os = require('os');
var path = require('path');
var releaseTasks = require('gulp-release-tasks');
var rename = require('gulp-rename');
var seq = require('run-sequence');
var uglify = require('gulp-uglify');
var webServer = require('gulp-webserver');


// -----------------------------------------------------
// Globals
// -----------------------------------------------------
var GLOBS = {};
GLOBS.output = 'dist';
GLOBS.fonts = 'src/fonts/*';
GLOBS.assets = 'src/assets/**/*';
GLOBS.images = ['src/img/*', 'src/img/**/*'];
GLOBS.js = 'src/js/**/*';
GLOBS.languages = 'src/languages/*';
GLOBS.libs = 'src/libs/**/*';
GLOBS.less = {
    main: 'src/less/avanti.less',
    dir: 'src/less/**/*'
};
GLOBS.html = 'src/index.html';
GLOBS.views = 'src/views/**/*';

// -------------------------------------------------------
// Errors
// -------------------------------------------------------
gulp.on('error', function(e) {
    throw (e);
});

// --------------------------------------------------------
// Clean dest folder
// --------------------------------------------------------
gulp.task('clean', function(done) {
    del('dist/**').then(paths => {
        done();
    });
});

// --------------------------------------------------------
// Copy sequence
// --------------------------------------------------------
gulp.task('copy:fonts', function() {
    return gulp.src(GLOBS.fonts)
        .pipe(gulp.dest(path.join(GLOBS.output, 'fonts')));
});

gulp.task('copy:images', function() {
    return gulp.src(GLOBS.images)
        .pipe(gulp.dest(path.join(GLOBS.output, 'img')));
});

gulp.task('copy:assets', function() {
    return gulp.src(GLOBS.assets)
        .pipe(gulp.dest(path.join(GLOBS.output, 'assets')));
});

gulp.task('copy:html', function() {
    return gulp.src(GLOBS.html)
        .pipe(gulp.dest(GLOBS.output));
});

gulp.task('copy:views', function() {
    return gulp.src(GLOBS.views)
        .pipe(gulp.dest(path.join(GLOBS.output, 'views')));
});

gulp.task('copy:libs', function() {
    return gulp.src(GLOBS.libs)
        .pipe(gulp.dest(path.join(GLOBS.output, 'libs')));
});

gulp.task('copy', function(done) {
    seq('copy:fonts', 'copy:images', 'copy:assets', 'copy:html', 'copy:views', 'copy:libs', done);
});

// --------------------------------------------------------
// Less styles
// --------------------------------------------------------
var CSS_TEMP_DIR = path.join(os.tmpdir(), 'avanti', 'css');

gulp.task('css:build', function() {
    return gulp.src(GLOBS.less.main)
        .pipe(less())
        .pipe(gulp.dest(CSS_TEMP_DIR));
});

gulp.task('css:minify', function() {
    return gulp.src(path.join(CSS_TEMP_DIR, 'avanti.css'))
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.join('dist', 'css')));
});

gulp.task('css', function(done) {
    seq('css:build', 'css:minify', done);
});

// --------------------------------------------------------
// Minify and copy js
// --------------------------------------------------------
gulp.task('languages', function() {
    return gulp.src(GLOBS.languages)
        .pipe(jsonMinify())
        .pipe(gulp.dest(path.join('dist', 'languages')));
});

// --------------------------------------------------------
// Minify and copy js
// --------------------------------------------------------
gulp.task('js', function() {
    return gulp.src(GLOBS.js)
        .pipe(concat('avanti.min.js'))
        .pipe(uglify())
        .on('error', function(uglify) {
            log.error('Error uglifying', chalk.red(uglify.fileName))
            log.error('\tat', chalk.magenta(uglify.line + ':'), chalk.red(uglify.message));
        })
        .pipe(gulp.dest(path.join(GLOBS.output, 'js')));
});

// --------------------------------------------------------
// Serve app
// --------------------------------------------------------
gulp.task('serve', function() {
    gulp.src('dist')
        .pipe(webServer({
            livereload: false,
            open: true
        }));
});

// --------------------------------------------------------
// Watchers
// --------------------------------------------------------
gulp.task('watch', function() {
    gulp.watch('src/**/*', ['build']);
});

//=======================================================================
// Watchers
//=======================================================================
gulp.task('watch', function() {
	var watchLog = function(event) {
		log(chalk.gray.italic('File ' + event.path + ' was ' + event.type + ', running tasks...'));
	};

	gulp.watch(GLOBS.languages, ['languages']).on('change', watchLog);
	gulp.watch(GLOBS.views, ['copy:views']).on('change', watchLog);
	gulp.watch(GLOBS.libs, ['copy:libs']).on('change', watchLog);
	gulp.watch(GLOBS.js, ['js']).on('change', watchLog);
	// gulp.watch(GLOBS.jsLogin, ['js:login']).on('change', watchLog);
	gulp.watch(GLOBS.less.dir, ['css']).on('change', watchLog);
	// gulp.watch(GLOBS.html, ['copy:html']).on('change', watchLog);
	// gulp.watch(GLOBS.videoPlayer, ['copy:videoPlayer']).on('change', watchLog);
	// gulp.watch(GLOBS.icons, ['icons']).on('change', watchLog);
});

// --------------------------------------------------------
// Sequences
// --------------------------------------------------------
gulp.task('build', function(done) {
    seq('clean', 'copy', 'css', 'languages', 'js', done);
});

gulp.task('default', function(done) {
    seq('build', 'serve', 'watch', done);
});

// --------------------------------------------------------
// Release
// --------------------------------------------------------
releaseTasks(gulp);
