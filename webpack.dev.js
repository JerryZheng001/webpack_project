/**2021/7/21 jerry***/

/****************** */
// 开发环境的需求：
// 　　　　模块热更新  （本地开启服务，实时更新）
// 　　　　sourceMap    (方便打包调试)
// 　　　　接口代理　    (配置proxyTable解决开发环境中的跨域问题)
// 　　　　代码规范检查 (代码规范检查工具)
/****************** */
const { resolve } = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');

const devConfig = {
    mode: 'development',
    devServer: {
        static: './dist', // webpack-dev-server3中对应的配置是contentBase: './dist'
        proxy: { //设置代理，可用于本地mock数据，本地自己启动另外一个服务
            "/api": {
                target: "",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }

            }
        },
        open: true, //在服务器启动后打开浏览器
        port: 8088, //指定端口号
        hot: true, //开启HMR(Hot Module Replacement)热模块替换,由于是webpack自带的，所以要引入webpack ，监控并更新js模块的工作vue等框架自己做了，否则需要自己手动监控 
        // hotOnly: true
    },
    // devtool是设置打包时的文件映射，文件映射越完整，打包速度越慢，devtool可以设置各种速度和程度的打包及文件映射。
    devtool: 'source-map', //设置文件映射
    plugins: [
        // 模块热替换功能
        new webpack.HotModuleReplacementPlugin(),

    ]
}

//合并公共配置文件和开发配置文件
module.exports = merge(commonConfig, devConfig);