var webpack = require('webpack');
var path = require('path');

var src_path = path.resolve(__dirname, 'src');
var dist_path = path.resolve(__dirname, 'dist');

module.exports = function (env, argv) {
    var prod = argv.mode === 'production';
    return {
        mode: prod ? 'production' : 'development',
        context: src_path,
        entry: { index: './index.js' },
        output: {
            path: dist_path,
            filename: '[name].js',
            publicPath: 'auto'
        },
        resolve: {
            fallback: {
                buffer: require.resolve('buffer/')
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }, {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }, {
                    test: /\.png$/,
                    type: 'asset',
                    parser: { dataUrlCondition: { maxSize: 100000 } }
                }, {
                    test: /\.jpg$/,
                    type: 'asset/resource'
                }, {
                    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                    type: 'asset',
                    parser: { dataUrlCondition: { maxSize: 10000 } }
                }, {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    type: 'asset',
                    parser: { dataUrlCondition: { maxSize: 10000 } }
                }, {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    type: 'asset/resource'
                }, {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    type: 'asset',
                    parser: { dataUrlCondition: { maxSize: 10000 } }
                }, {
                    test: /\.swf$/,
                    type: 'asset/resource',
                    generator: { filename: '[name][ext]' }
                }, {
                    test: require.resolve('snapsvg'),
                    use: [{
                        loader: 'imports-loader',
                        options: {
                            wrapper: 'window',
                            additionalCode: 'var fix = module.exports = 0;'
                        }
                    }]
                },
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
        ],
        devServer: {
            static: dist_path,
            hot: false,
            host: 'localhost'
        },
        devtool: 'source-map'
    };
};
