'use strict'
// Template version: 1.2.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/nus/':{
            target:'http://192.168.10.103:8080',
            // target:'http://192.168.10.162:10022',
            changeOrigin:true,
            pathRewrite:{
                '^/nus/':'/nus'
            }
        },
        '/uus/':{
            target:'http://192.168.10.103:8080',
            // target:'http://192.168.10.162:10022',
            changeOrigin:true,
            pathRewrite:{
                '^/uus':'/uus'
            }
        },
        '/ums/':{
            target:'http://192.168.10.103:8080',
            // target:'http://192.168.10.48:10022',
            changeOrigin:true,
            pathRewrite:{
                '^/ums' : '/ums' 
            }
        },
        '/nms/':{
            target:'http://192.168.10.103:10023',
            // target:'http://192.168.10.103:8080',
            changeOrigin:true,
            pathRewrite:{
                '^/nms/' : '/nms/'
            }
        },
        '/mns/':{
            // target:'http://192.168.10.35:10034',
            target:'http://192.168.10.103:8080',
            changeOrigin:true,
            pathRewrite:{
                '^/mns/' : '/mns/'
            }
        },
        '/ors/':{
            target:'http://192.168.10.103:8080',
            changeOrigin:true,
            pathRewrite:{
              '^/ors/' : '/ors/'
            }
        },
        '/rfs/':{
            target:'http://192.168.10.103:8080',
            changeOrigin:true,
            pathRewrite:{
                '^/rfs/' : '/rfs/'
            }
        }
    },
    // Various Dev Server settings
    host:"192.168.10.66",
    port: 8081, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
  
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/yfd_nms/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
