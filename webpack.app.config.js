const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = require('./config/env');
const common = require('./config/common');
const loaders = require('./config/loaders');

const config = {
    entry: {
        app: [
            path.join(env.paths.scripts, 'index.ts')
        ]
    },
    plugins: [
        new ManifestPlugin({
            fileName: 'app-manifest.json',
            writeToFileEmit: true,
            publicPath: '/'
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./dist/vendor.json')
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: path.join(env.paths.src, 'index.ejs')
        })
    ]
};

module.exports = merge([
    common,
    loaders.loadTypescript(),
    loaders.loadVue(),
    loaders.loadStyles(),
    loaders.loadImages(),
    loaders.loadFonts(),
    config
]);
