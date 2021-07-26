/* 2021/7/21 jerry */

/*********************/
// 生产环境的需求：
// 　　　　提取公共代码　 　　    
// 　　　　压缩混淆(压缩混淆代码，清除代码空格，注释等信息使其变得难以阅读)
// 　　　　文件压缩/base64编码(压缩代码，减少线上环境文件包的大小)
// 　　　　去除无用的代码
/*******************/


const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');


const prodConfig = {
    mode: 'production',
    plugins: [

    ]
}

module.exports = merge(commonConfig, prodConfig);