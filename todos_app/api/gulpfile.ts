import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import { createRequire } from "module";
//const require = createRequire(import.meta.url);
const del = require("del");
import * as zip from 'gulp-zip';
import { exec } from 'child_process';

// Define paths
const paths = {
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
const tsProject = ts.createProject('tsconfig.json');

// Clean the dist directory
export const clean = () => del(['dist']);

// Compile backend TypeScript files
export const compileBackend = () => {
  return gulp.src(paths.backend.src)
    .pipe(tsProject())
    .js.pipe(gulp.dest(paths.backend.dest));
};

// Copy frontend build files
export const copyFrontend = () => {
  return gulp.src(paths.frontend.src)
    .pipe(gulp.dest(paths.frontend.dest));
};

// Build the frontend using Vite (or your bundler's CLI command)
export const buildFrontend = (cb: (err: any) => void) => {
  exec('npm run build --prefix vue-app', (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
};

// Create a zip file of the final build
export const zipBuild = () => {
  return gulp.src(paths.zip.src)
    .pipe(zip(paths.zip.outputFile))
    .pipe(gulp.dest('.'));
};

// Define complex tasks
const buildBackend = gulp.series(clean, compileBackend);
const build = gulp.series(buildBackend, buildFrontend, copyFrontend, zipBuild);

// Export tasks
export default build;
