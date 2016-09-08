var args = require('yargs').argv,
    path = require('path'),
    fs = require('fs'),
    del = require('del'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    webpackStream = require('webpack-stream'),
    gulpsync = $.sync(gulp),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    historyApiFallback = require('connect-history-api-fallback'),
    PluginError = $.util.PluginError,
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpack = require('webpack');

// production mode (see build task)
// Example:
//    gulp --prod
var isProduction = !!args.prod;

if (isProduction)
    log('Starting production build...');

// styles sourcemaps
var useSourceMaps = false;

// Switch to sass mode.
// Example:
//    gulp --usesass
var useSass = true; // args.usesass // ReactJS project defaults to SASS only

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;

// MAIN PATHS
var paths = {
    app: 'master/',
    dist: 'dist/',
    markup: 'jade/',
    styles: 'sass/',
    scripts: 'jsx/'
}

// if sass -> switch to sass folder
if (useSass) {
    log('Using SASS stylesheets...');
    paths.styles = 'sass/';
}

// VENDOR CONFIG
var vendor = {
    source: './vendor.json',
    dist: paths.dist + 'vendor',
    bundle: {
        js: 'vendor.bundle.js',
        css: 'vendor.bundle.css'
    }
};

// SOURCES CONFIG
var source = {
    scripts: {
        app: [paths.app + paths.scripts + '**/*.{jsx,js}'],
        entry: [paths.app + paths.scripts + 'App.jsx']
    },
    templates: {
        index: paths.app + 'index.html'
    },
    styles: {
        app: [paths.app + paths.styles + '*.*'],
        themes: [paths.app + paths.styles + 'themes/*', ignored_files],
        watch: [paths.app + paths.styles + '**/*', '!' + paths.app + paths.styles + 'themes/*']
    },
    images: [paths.app + 'img/**/*'],
    fonts: [
        paths.app + 'fonts/*.{ttf,woff,woff2,eof,svg}'
    ],
    serverAssets: [paths.app + 'server/**/*']
};

// BUILD TARGET CONFIG
var build = {
    scripts: paths.dist + 'js',
    styles: paths.dist + 'css',
    images: paths.dist + 'img',
    fonts: paths.dist + 'fonts',
    serverAssets: paths.dist + 'server'
};

// PLUGINS OPTIONS

var vendorUglifyOpts = {
    mangle: {
        except: ['$super'] // rickshaw requires this
    }
};

var cssnanoOpts = {
    safe: true,
    discardUnused: false,
    reduceIdents: false
}

var webpackConfig = require(
    isProduction ?
    './webpack.config.prod' :
    './webpack.config.dev'
);

var bundler = webpack(webpackConfig);

//---------------
// TASKS
//---------------


// JS APP
gulp.task('scripts:app', function() {
    log('Building scripts..');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.scripts.entry)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe(
            webpackStream(webpackConfig)
        )
        .on("error", handleError)
        .pipe($.if(isProduction, $.uglify({
            preserveComments: 'some'
        })))
        .on("error", handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.scripts))
        .pipe( $.if(isProduction, reload({ stream: true})) );
});

// VENDOR BUILD
// copy file from bower folder into the app vendor folder
gulp.task('vendor', function() {
    log('Copying vendor assets..');

    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    var cssFilter = $.filter('**/*.css', {
        restore: true
    });
    var imgFilter = $.filter('**/*.{png,jpg}', {
        restore: true
    });
    var fontsFilter = $.filter('**/*.{ttf,woff,woff2,eof,svg}', {
        restore: true
    });

    var vendorSrc = JSON.parse(fs.readFileSync(vendor.source, 'utf8'));

    return gulp.src(vendorSrc, {
            base: 'bower_components'
        })
        .pipe($.expectFile(vendorSrc))
        .pipe(jsFilter)
        .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
        .pipe($.concat(vendor.bundle.js))
        .pipe(gulp.dest(build.scripts))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.concat(vendor.bundle.css))
        .pipe(gulp.dest(build.styles))
        .pipe(cssFilter.restore())
        .pipe(imgFilter)
        .pipe($.flatten())
        .pipe(gulp.dest(build.images))
        .pipe(imgFilter.restore())
        .pipe(fontsFilter)
        .pipe($.flatten())
        .pipe(gulp.dest(build.fonts));

});

// APP LESS
gulp.task('styles:app', function() {
    log('Building application styles..');
    return gulp.src(source.styles.app)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe(useSass ? $.sass() : $.less())
        .on("error", handleError)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

// APP RTL
gulp.task('styles:app:rtl', function() {
    log('Building application RTL styles..');
    return gulp.src(source.styles.app)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe(useSass ? $.sass() : $.less())
        .on("error", handleError)
        .pipe($.rtlcss())
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe($.rename(function(path) {
            path.basename += "-rtl";
            return path;
        }))
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

// LESS THEMES
gulp.task('styles:themes', function() {
    log('Building application theme styles..');
    return gulp.src(source.styles.themes)
        .pipe(useSass ? $.sass() : $.less())
        .on("error", handleError)
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts', function() {
    return gulp.src(source.fonts)
        .pipe($.flatten())
        .pipe(gulp.dest(build.fonts))
})

gulp.task('images', function() {
    return gulp.src(source.images)
        .pipe(gulp.dest(build.images))
})

gulp.task('server-assets', function() {
    return gulp.src(source.serverAssets)
        .pipe(gulp.dest(build.serverAssets))
})

gulp.task('templates:index', function() {
    return gulp.src(source.templates.index)
        .pipe(gulp.dest(paths.dist))
})


//---------------
// WATCH
//---------------

// Rerun the task when a file changes
gulp.task('watch', function() {
    log('Watching source files..');

    gulp.watch(source.scripts.app, ['scripts:app']);
    gulp.watch(source.styles.watch, ['styles:app', 'styles:app:rtl']);
    gulp.watch(source.styles.themes, ['styles:themes']);
    gulp.watch(source.templates.index, ['templates:index']);
    gulp.watch(vendor.source, ['vendor']);

});

// Serve files with auto reaload
gulp.task('browsersync', function() {
    log('Starting BrowserSync..');

    var middlewares = [historyApiFallback()];

    if (!isProduction) {
        middlewares = middlewares.concat([
            webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath,
                stats: {
                    colors: true
                }
            }),
            webpackHotMiddleware(bundler)
        ])
    }

    browserSync({
        notify: false,
        server: {
            baseDir: paths.dist,
            middleware: middlewares
        },
        files: [source.scripts.app]
    });

});

//---------------
// MAIN TASKS
//---------------

// build for production (no watch)
gulp.task('build', gulpsync.sync([
    'vendor',
    'assets'
]));

// Server for development
gulp.task('serve', gulpsync.sync([
    'default',
    'browsersync'
]), done);

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function() {
    useSourceMaps = true;
});

// default (no minify)
gulp.task('default', gulpsync.sync([
    'vendor',
    'assets',
    'watch'
]));

gulp.task('assets', [
    'fonts',
    'images',
    'server-assets',
    'scripts:app',
    'styles:app',
    'styles:app:rtl',
    'styles:themes',
    'templates:index'
]);

// Remove all files from dist folder
gulp.task('clean', function(done) {
    log('Clean dist folder..');
    del(paths.dist, {
        force: true // clean files outside current directory
    }, done);
});

/////////////////////

function done() {
    log('************');
    log('* All Done * You can start editing your code, BrowserSync will update your browser after any change..');
    log('************');
}

// Error handler
function handleError(err) {
    log(err.toString());
    this.emit('end');
}

// log to console using
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}