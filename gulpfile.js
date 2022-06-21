const {src, dest,series, watch} = require(`gulp`)
const sass = require('gulp-sass')(require('sass'))
const csso = require(`gulp-csso`)
const include = require(`gulp-file-include`)
const htmlmin = require(`gulp-htmlmin`)
const concat = require(`gulp-concat`)
const  autoprefixer = require(`gulp-autoprefixer`)
const del = require(`del`)
const sync = require(`browser-sync`).create()
const imagemin = require('gulp-imagemin');

function html(){
   return  src(`src/**.html`)
        .pipe(include({
            prefix:`@@`}))
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
        .pipe(dest(`dist`))
}
function scss(){
    return src(`src/scss/**.scss`)
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'))
}
function minimg(){
    return src('src/img/**')
        .pipe(imagemin())
        .pipe(dest('dist/img'))
}
function clear(){
    return del('dist')
}
function serve(){
    sync.init({
        server:'./dist'
    })
    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(html)).on('change', sync.reload)
}

// exports.html=html
// exports.scss=scss
exports.build=series(clear,scss,html,minimg)
exports.serve=series(clear,scss,html,minimg,serve)
exports.clear=clear