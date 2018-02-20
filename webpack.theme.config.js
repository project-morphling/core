const path = require('path');
const merge = require('webpack-merge');

const ManifestPlugin = require('webpack-manifest-plugin');

const env = require('./config/env');
const common = require('./config/common');
const loaders = require('./config/loaders');

const config = {
    entry: {
        theme: [
            path.join(env.paths.styles, 'main.scss')
        ]
    },
    plugins: [
        new ManifestPlugin({
            fileName: 'theme-manifest.json',
            publicPath: '/'
        })
    ]
};

module.exports = merge([
    common,
    loaders.loadStyles(),
    loaders.loadImages(),
    loaders.loadFonts(),
    config
]);