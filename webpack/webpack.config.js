import webpack from 'webpack';
import path from 'path';
import WebpackBar from 'webpackbar';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isDevelopment = process.env.NODE_ENV !== 'production';
const __dirname = process.cwd();

const shouldOpenAnalyzer = process.argv.includes('--analyze');

const devServer = {
  hot: true,
  historyApiFallback: true,
  devMiddleware: {
    writeToDisk: true,
  },
  // proxy: [
  //   {
  //     context: ['/api'],
  //     ws: true,
  //     target:
  //       process.env.env === 'mock'
  //         ? 'http://apidoc.i.ssc.shopeemobile.com/mock/2255/'
  //         : process.env.API_HOST || proxyTarget,
  //     changeOrigin: true,
  //     onProxyRes(proxyRes, _, res) {
  //       const { protocol, host, path } = proxyRes.req;
  //       res.writeHead(proxyRes.statusCode, {
  //         ...proxyRes.headers,
  //         'x-webpack-proxy-target': `${protocol}//${host}${path}`,
  //       });
  //     },
  //   },
  //   {
  //     context: ['/auth/login', '/auth/logout'],
  //     target: process.env.API_HOST || proxyTarget,
  //     changeOrigin: true,
  //     onProxyRes(proxyRes, _, res) {
  //       const { path } = proxyRes.req;
  //       res.writeHead(proxyRes.statusCode, {
  //         ...proxyRes.headers,
  //         'x-webpack-proxy-target': `${proxyTarget}${path}`,
  //       });
  //     },
  //   },
  // ],
};

const webpackConfig = {
  entry: {
    index: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      cache: true,
    }),
    new WebpackBar({
      name: isDevelopment ? 'RUNNING' : 'BUNDLING',
      color: isDevelopment ? '#52c41a' : '#722ed1',
    }),
    new CleanWebpackPlugin(),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    !isDevelopment && new MiniCssExtractPlugin(),
    shouldOpenAnalyzer && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      // tsx 处理
      // 可以直接用 ts-loader，但是会失去 polyfill
      // 也可以只用 babel-loader，配合使用 @babel/preset-typescript
      // babel/preset-typescript 似乎不能处理 src 之外的目录，比如一些 link 过去的包文件，相当与时 node_modules 中的 ts 文件，配置 tsconfig include exclude 之后也没有作用
      {
        test: /\.j|tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          // options: {
          //   cacheDirectory: true,
          // },
        }],
      },
      // 样式处理
      {
        test: /\.css$/,
        use: [
          isDevelopment ? {
            loader: 'style-loader',
            options: {
              esModule: true,
            },
          } : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          isDevelopment ? {
            loader: 'style-loader',
            options: {
              esModule: true,
            },
          } : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
              // modules: true
            },
          }, {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true, // antd 需要，另外需要通过 babel-import-plugin 做按需组件加载
              },
            },
          },
        ],
      },
      // 其他静态资源处理
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset', // https://webpack.js.org/guides/asset-modules/
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  devtool: isDevelopment ? 'source-map' : false,
  stats: 'errors-warnings',
  infrastructureLogging: {
    level: 'error',
  },
  // optimize: {
  //   splitChunks: {},
  // },
  devServer: isDevelopment ? devServer : undefined,
};

export default webpackConfig;
