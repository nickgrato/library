var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

//The JS files to watch
var jsFiles = ['*.js', 'src/**/*.js'];



//STYLE
//checks all js for code standards
gulp.task('style', function(){
    gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
        verbose: true
    }))
    .pipe(jscs());
});

//INJECT DEP
//injectiong script and style files to index.ejs
gulp.task('inject', function(){
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    //inject options
    var injectSrc = gulp.src(['./public/css/*.css',
                               './public/js/*.js' ], {read:false});
    var injectOptions = {
        ignorePath: '/public'
    };

    //wiredep optiomns
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.ejs')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src/views'));
});

//The Server
gulp.task('serve', ['style', 'inject'], function(){

    //nodemon options
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };
    return nodemon(options)
            .on('restart', function(ev){
                console.log('restarting..'); 
            });
});