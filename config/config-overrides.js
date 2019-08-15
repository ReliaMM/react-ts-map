const { override, fixBabelImports, addWebpackAlias, addLessLoader } = require('customize-cra')
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
  (config) => {
    config.module.rules[2].oneOf[5].use.push({
        loader: 'sass-resources-loader',
        options: {
          resources: [
            'src/assets/styles/variables.scss',
            'src/assets/styles/mixins.scss'
          ]
        }
    })
    return config
  }
)