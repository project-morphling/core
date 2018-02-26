const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const ManifestPlugin = require('webpack-manifest-plugin');

const env = require('./config/env');
const common = require('./config/common');
const loaders = require('./config/loaders');

const config = {
    entry: {
        vendor: [
            path.join(env.paths.scripts, 'vendor.js')
        ]
    },
    plugins: [
        new ManifestPlugin({
            fileName: 'vendor-manifest.json',
            writeToFileEmit: true,
            publicPath: '/'
        }),
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(env.paths.dist, '[name].json')
        })
    ],
    devtool: false
};

module.exports = merge([
    common,
    loaders.loadStyles(),
    loaders.loadFonts(),
    loaders.loadImages(),
    config
]);