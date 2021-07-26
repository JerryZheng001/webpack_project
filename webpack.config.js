/**2021/7/21 jerry***/
/*****************************/
// 　　开发环境和生产环境的共同需求：
// 　　　　同样的入口
// 　　　　同样的代码处理(loader处理)
// 　　　　同样的解析配置
/*****************************/

const { resolve } = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: {
        index: resolve(__dirname, './src/js/index.js'),
        detail: resolve(__dirname, './src/js/detail.js'),
        collections: resolve(__dirname, './src/js/collections.js'),
    },
    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname, 'dist'),
    },
    // devtool: 'cheap-module-eval-source-map', //   映射
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            //用于解析ES6+React
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                },
                            ],

                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    corejs: { version: 3 } // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
                                }
                            ]
                        ]

                    },
                },
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'MiniCssExtract.loader', 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer()]
                        }

                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer()]
                        }

                    },
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', //放在正确的打包位置
                    'MiniCssExtract.loader',
                    'css-loader', //打包合并css
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer()]
                        }

                    },
                    // , //自定义前缀
                    'sass-loader' //处理sass，转成css
                ]
            },
            //打包字体
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.(png|jpg|gif|ico|woff)$/,
                loader: "url-loader",
                options: {
                    name: "[name]-[hash].[ext]", //[]表示占位符，name表示源文件的名字，ext是源文件的后缀，还可以连接hash：[name]-[hash].[ext]
                    outputPath: "images/",
                    limit: 2048, //当url-loader处理jpg模块，会判断体积是否在限制范围之内，在limit之内的，就转成base64格式并打包到bundle.js，否则就不转直接输出到dist
                }
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'], //在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
        modules: ['./src/components', 'node_modules'],
        alias: {
            components: './src/components/'
        }
    },

    plugins: [
        // 执行顺序从上到下
        //使用插件生成Html入口文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve(__dirname, 'src/index.html'),
            title: '首页',
            chunks: ['index'],
            chunksSortMode: 'manual',
            excldeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'detail.html',
            template: resolve(__dirname, 'src/detail.html'),
            title: '新闻详情',
            chunks: ['detail'],
            chunksSortMode: 'manual',
            excldeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true //压缩成一行，
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'collections.html',
            template: resolve(__dirname, 'src/collections.html'),
            title: '新闻详情',
            chunks: ['collections'],
            chunksSortMode: 'manual',
            excldeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        //插件是在打包之前，自动帮我们删除dist目录，以免污染打包环境。
        new CleanWebpackPlugin(),
        //代替style-loader，抽离css，并输出到dist目录
        new MiniCssExtractPlugin({
            filename: '[name].css', //输出文件名 
            chunkFilename: '[id].css', //模块名
        }),

    ],

};