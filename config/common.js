const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const env = require('./env');

const common = {
    output: {
        path: env.paths.dist,
        publicPath: '/',
        filename: 'js/[name].[chunkhash:8].js',
        library: '[name]'
    },
    resolve: {
        symlinks: false,
        extensions: ['.js', '.ts'],
        modules: [
            path.resolve(env.paths.root, 'node_modules')
        ]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    devtool: env.dev ? 'cheap-module-source-map' : 'source-map',
    bail: !env.watch,
    stats: {
        modules: false,
        errorDetails: true,
        colors: true,
        cached: true,
        entrypoints: false
    },
    watch: env.watch,
    watchOptions: {
        aggregateTimeout: 1000
    }
};

const configs = [common];

if (env.min) {
    configs.push({
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                parallel: true,
                minimize: true,
                comments: false
            })
        ]
    });
}

module.exports = merge(configs);