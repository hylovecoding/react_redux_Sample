
var path = require('path');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

var minimize = process.argv.indexOf('--minimize') !== -1;
var  plugins = [];
if (minimize) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}



var config = {
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['latest', 'react']
            }
        }, {
            test: /\.(css|scss)$/, // Only .css files
            loader: 'style!css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss?parser=postcss-scss!sass',
            //loader: 'style!css!sass' // Run sass loader(compiled css)-->css loader(resolved the path import and urls(...), modularized)-->style loader(Adds CSS to the DOM by injecting a <style> tag)
            //postcss is neither pre nor post processor, it can do both.Also you have choice to add plugin
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }]
    },
    postcss: function () {
        return [require('autoprefixer'), require('precss')];
    },
    plugins: plugins
};

module.exports = config;