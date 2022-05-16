const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const deleteEmpty = require('delete-empty');

const packages = {
    common: ts.createProject('packages/common/tsconfig.json'),
    boot: ts.createProject('packages/boot/tsconfig.json'),
    core: ts.createProject('packages/core/tsconfig.json'),
    consul: ts.createProject('packages/consul/tsconfig.json'),
    etcd: ts.createProject('packages/etcd/tsconfig.json'),
    config: ts.createProject('packages/config/tsconfig.json'),
    service: ts.createProject('packages/service/tsconfig.json'),
    loadbalance: ts.createProject('packages/loadbalance/tsconfig.json'),
    logger: ts.createProject('packages/logger/tsconfig.json'),
    schedule: ts.createProject('packages/schedule/tsconfig.json'),
    brakes: ts.createProject('packages/brakes/tsconfig.json'),
    http: ts.createProject('packages/http/tsconfig.json'),
    grpc: ts.createProject('packages/grpc/tsconfig.json'),
    proxy: ts.createProject('packages/proxy/tsconfig.json'),
    kubernetes: ts.createProject('packages/kubernetes/tsconfig.json'),
};
const modules = Object.keys(packages);
const source = 'packages';
const distId = process.argv.indexOf('--dist');
const dist = distId < 0 ? source : process.argv[distId + 1];

gulp.task('default', function() {
    modules.forEach(module => {
        gulp.watch([`${source}/${module}/**/*.ts`, `${source}/${module}/*.ts`], [module]);
    });
});

gulp.task('copy-misc', function() {
    return gulp
        .src(['LICENSE', '.npmignore'])
        .pipe(gulp.dest(`${source}/common`))
        .pipe(gulp.dest(`${source}/boot`))
        .pipe(gulp.dest(`${source}/core`))
        .pipe(gulp.dest(`${source}/etcd`))
        .pipe(gulp.dest(`${source}/consul`))
        .pipe(gulp.dest(`${source}/config`))
        .pipe(gulp.dest(`${source}/service`))
        .pipe(gulp.dest(`${source}/loadbalance`))
        .pipe(gulp.dest(`${source}/logger`))
        .pipe(gulp.dest(`${source}/schedule`))
        .pipe(gulp.dest(`${source}/brakes`))
        .pipe(gulp.dest(`${source}/http`))
        .pipe(gulp.dest(`${source}/grpc`))
        .pipe(gulp.dest(`${source}/proxy`))
        .pipe(gulp.dest(`${source}/kubernetes`));
});

gulp.task('clean:output', function() {
    return gulp
        .src([`${source}/**/*.js`, `${source}/**/*.d.ts`, `${source}/**/*.js.map`], {
            read: false,
        })
        .pipe(clean());
});

gulp.task('clean:dirs', function(done) {
    deleteEmpty.sync(`${source}/`);
    done();
});

gulp.task('clean:bundle', gulp.series('clean:output', 'clean:dirs'));

modules.forEach(module => {
    gulp.task(module, () => {
        return packages[module]
            .src()
            .pipe(packages[module]())
            .pipe(gulp.dest(`${dist}/${module}`));
    });
});

modules.forEach(module => {
    gulp.task(module + ':dev', () => {
        return packages[module]
            .src()
            .pipe(sourcemaps.init())
            .pipe(packages[module]())
            .pipe(sourcemaps.mapSources(sourcePath => './' + sourcePath.split('/').pop()))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(`${dist}/${module}`));
    });
});

gulp.task('common:dev', gulp.series(modules.map(module => module + ':dev')));
gulp.task('build', gulp.series(modules));
gulp.task('build:dev', gulp.series('common:dev'));
