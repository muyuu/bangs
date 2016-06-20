const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const connect = require("gulp-connect");

const filename = "bangs";
const file = `${filename}.js`;

const port = 4000;

// local server
gulp.task("connect", () =>{
    connect.server({
        port      : port,
        livereload: true
    });

    options = {
        uri: `http://localhost:${port}/index.html`,
        app: `Google Chrome`
    };

    gulp.src("./index.html")
        .pipe($.open("", options));
});


gulp.task('css', ()=>{
    gulp.src(['src/css/style.sass'])
     .pipe($.sass())
     .pipe(gulp.dest('./'));
});


gulp.task('babel', ()=>{
    gulp.src(`src/js/${file}`)
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('lint', ()=>{
    gulp.src([`src/${file}`])
        .pipe($.eslint())
        .pipe($.eslint.formatEach());
});


gulp.task('jscs', ()=>{
    gulp.src(file)
        .pipe($.jscs());
});

gulp.task('dev', ['babel'], ()=>{
    gulp.start(['lint', 'jscs']);
});

gulp.task("default", ['connect'], ()=>{
    gulp.watch("src/**/*.js", ["dev"]);
    gulp.watch("src/**/*.sass", ["css"]);
});


//build
gulp.task('build', ['dev'], ()=>{
    gulp.src(file)
        .pipe($.sourcemaps.init())
        .pipe($.rename({
            basename: `${filename}.min`,
            extname : ".js"
        }))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('./'));
});


