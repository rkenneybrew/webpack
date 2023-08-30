// postcss.config.js
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

/*
const postcssCustomMedia = require('postcss-custom-media')
*/

/*
postcss([
    postcssCustomMedia(/!* pluginOptions *!/)
]).process('./webpack/public/components/css/style.css' /!*, processOptions *!/);
*/


const postcssNested = require('postcss-nested')

/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: [
        require('autoprefixer'),
        require('postcss-nested')
    ]
}


const fs = require('fs')

fs.readFile('src/app.css', (err, css) => {
    postcss([autoprefixer, postcssNested])
        .process(css, { from: 'src/app.css', to: 'dest/app.css' })
        .then(result => {
            fs.writeFile('dest/app.css', result.css, () => true)
            if ( result.map ) {
                fs.writeFile('dest/app.css.map', result.map.toString(), () => true)
            }
        })
})


// {
// postcss(plugins).process(css, { from, to }).then(result => {
//   console.log(result.css)
// })
// }

// /** @type {import('postcss-load-config').Config} */
// const config = {
//   plugins: [
//     require('autoprefixer'),
//     require('postcss-nested')
//   ]
// }

// const autoprefixer = require('autoprefixer')
// const postcssCustomMedia = require('postcss-custom-media')
// const postcssNested = require('postcss-nested')
// const fs = require('fs')

// fs.readFile('src/app.css', (err, css) => {
//   postcss([autoprefixer, postcssNested])
//       .process(css, { from: 'src/app.css', to: 'dest/app.css' })
//       .then(result => {
//         fs.writeFile('dest/app.css', result.css, () => true)
//         if ( result.map ) {
//           fs.writeFile('dest/app.css.map', result.map.toString(), () => true)
//         }
//       })
// })

//let config;
module.exports = config