const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'updatePlatformConfig.js',
        library: 'updatePlatformConfig',
        libraryTarget: 'commonjs2'
    },

    target: 'node', // in order to ignore built-in modules like path, fs, etc. 

    plugins: [
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
};