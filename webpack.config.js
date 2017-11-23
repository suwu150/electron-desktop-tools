let path = require('path');
let webpack = require('webpack');
let fs = require('fs');

// path
let ROOT_PATH = path.resolve(__dirname);
let SOURCE_PATH = path.resolve(ROOT_PATH, 'src');
let BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: path.join(SOURCE_PATH, './index.js'),
    devtool: '#inline-source-map',
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-1'
            },
            // {
            //     test: /\.jsx?$/,
            //     loaders: ['babel-loader'],
            //     exclude: /(node_modules|bower_components)/,
            // },
            // {
            //     test: /\.jsx?$/,
            //     loaders: ['babel-loader'],
            //     // exclude: /(node_modules|bower_components)/,
            //     include:SOURCE_PATH,
            // },
            {
                test: /\.css$|\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            // {
            //     test: /\.jsx?$/,
            //     loader: 'babel',
            //     include: SOURCE_PATH,
            //     query: {
            //         presets: ['es2015', 'react', 'stage-1']
            //     }
            // }
        ]
    },
    target: 'electron-renderer'
};