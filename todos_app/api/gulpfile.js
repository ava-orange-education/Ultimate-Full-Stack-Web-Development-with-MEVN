"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipBuild = exports.buildFrontend = exports.copyFrontend = exports.compileBackend = exports.clean = void 0;
var gulp = require("gulp");
var ts = require("gulp-typescript");
//const require = createRequire(import.meta.url);
var del = require("del");
var zip = require("gulp-zip");
var child_process_1 = require("child_process");
// Define paths
var paths = {
    backend: {
        src: 'dist/api/**/*.js',
        dest: 'dist/'
    },
    frontend: {
        // Assuming the frontend build directory is 'dist' in the Vue project
        src: '../ui/dist/**/*',
        dest: 'dist/public/'
    },
    zip: {
        src: 'dist/**/*',
        outputFile: 'project.zip'
    }
};
// TypeScript project for API
var tsProject = ts.createProject('tsconfig.json');
// Clean the dist directory
var clean = function () { return del(['dist']); };
exports.clean = clean;
// Compile backend TypeScript files
var compileBackend = function () {
    return gulp.src(paths.backend.src)
        .pipe(tsProject())
        .js.pipe(gulp.dest(paths.backend.dest));
};
exports.compileBackend = compileBackend;
// Copy frontend build files
var copyFrontend = function () {
    return gulp.src(paths.frontend.src)
        .pipe(gulp.dest(paths.frontend.dest));
};
exports.copyFrontend = copyFrontend;
// Build the frontend using Vite (or your bundler's CLI command)
var buildFrontend = function (cb) {
    (0, child_process_1.exec)('npm run build --prefix vue-app', function (err, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);
        cb(err);
    });
};
exports.buildFrontend = buildFrontend;
// Create a zip file of the final build
var zipBuild = function () {
    return gulp.src(paths.zip.src)
        .pipe(zip(paths.zip.outputFile))
        .pipe(gulp.dest('.'));
};
exports.zipBuild = zipBuild;
// Define complex tasks
var buildBackend = gulp.series(exports.clean, exports.compileBackend);
var build = gulp.series(buildBackend, exports.buildFrontend, exports.copyFrontend, exports.zipBuild);
// Export tasks
exports.default = build;
