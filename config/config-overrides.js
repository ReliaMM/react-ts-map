const { override, fixBabelImports, addWebpackPlugin, addPostcssPlugins, addWebpackAlias, addLessLoader } = require('customize-cra')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addWebpackAlias({
    'views': path.resolve(__dirname, '../', 'src/views'),
    'src': path.resolve(__dirname, '../', 'src'),
    'layout': path.resolve(__dirname, '../', 'src/layout'),
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1DA57A'
    }
  }),
  addWebpackPlugin(
    new HtmlWebpackPlugin({
      title: '斑马路线排划管理平台',
      filename: 'index.blade.php',
      template: path.join(__dirname, '../public/index.html') // 指定模板路径
    })
  ),
  addPostcssPlugins ([
    require('autoprefixer'),
    require('stylelint')
  ]),
  (config) => {
    // config.output.path = path.resolve(__dirname, '../test') // 打包路径 修改路径后，public依然打包到build路径@todo
    // config.output.publicPath =  './'或者package.json配置 homepage // 打包路径
    
    config.module.rules[2].oneOf[5].exclude = 
    [
      /\.module\.(scss|sass)$/,
      path.resolve(__dirname, '../src/assets/styles')
    ]
    config.module.rules[2].oneOf[5].use[1] = {
      loader: 'typings-for-css-modules-loader',
      options: {
        modules: true,
        namedExport: true,
        camelCase: true,
        sass: true
      }
    }
    config.module.rules[2].oneOf[5].use.push({
      loader: 'sass-resources-loader',
      options: {
        resources: [
          'src/assets/styles/variables.scss',
          'src/assets/styles/mixins.scss'
        ]
      }
    })
    // console.log(config.module.rules[2].oneOf)
    // console.log(aa)
    return config
  }
)