const {
  addLessLoader,
  addBabelPlugin,
  override,
  fixBabelImports,
  useEslintRc,
} = require('customize-cra');
const rewireYAML = require('react-app-rewire-yaml');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = override(
  useEslintRc(),
  addBabelPlugin(['babel-plugin-emotion', { sourceMap: true, autoLabel: true }]),
  fixBabelImports('babel-plugin-import', {
    libraryName: 'antd',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
      '@primary-color': '#9BC4CB',
      '@menu-bg': 'transparent',
      '@menu-dark-bg': 'transparent',
      '@menu-dark-item-active-bg': 'transparent',
    },
  }),
  config => ({ ...config, plugins: config.plugins.concat(new HardSourceWebpackPlugin()) }),
  rewireYAML,
);
