let path = require('path');
let webpack = require('webpack');
let fs = require('fs');
// 性能分析工具Perf的导入
// const Perf = require.resolve('react-addons-perf');
require('react-addons-perf');
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
          {
            // 进行性能
            test: require.resolve("react-addons-perf"),
            loader: "expose-loader?Perf"
            /*
            * // expose loader 用来把模块暴露到全局变量。这个功对调试或者支持依赖其他全局库的库时很有用
            * require("expose-loader?libraryName!./file.js");
            * // 通过属性名 "libraryName" 暴露 file.js 的 exports 到全局上下文。
            * // 在浏览器中，就将可以使用 window.libraryName 。
            * */
          }
        ]
    },
    target: 'electron-renderer'
};