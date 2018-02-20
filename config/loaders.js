const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = require('./env');

const extract = new ExtractTextPlugin({
    filename: 'css/[name].[chunkhash:8].css',
    disable: env.dev,
    allChunks: true
});

exports.loadTypescript = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader'
                }
            ]
        }
    };
};

exports.loadVue = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        esModule: true
                    }
                }
            ]
        }
    };
};

exports.loadStyles = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: extract.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: env.min,
                                    sourceMap: env.dev
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.scss$/,
                    use: extract.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: env.min,
                                    sourceMap: env.dev
                                }
                            },
                            {
                                loader: 'resolve-url-loader',
                                options: {
                                    sourceMap: env.dev
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: env.dev
                                }
                            }
                        ]
                    })
                }
            ]
        },
        plugins: [
            extract
        ]
    };
};

exports.loadImages = function () {
    const config = {
        module: {
            rules: [
                {
                    test: /\.(ico|png|gif|jpe?g|xml|svg)$/,
                    loader: 'file-loader',
                    options: {
                        hash: 'sha512',
                        digest: 'hex',
                        publicPath: '/',
                        name: 'images/[name]-[hash].[ext]'
                    }
                }
            ]
        }
    };
    
    return config;
};

exports.loadFonts = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.(woff2?|[ot]tf|eot)\??(v=[0-9]\.[0-9]\.[0-9])?(\#[a-zA-Z0-9\_]+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name]-[hash].[ext]'
                    }
                }
            ]
        }
    };
};
