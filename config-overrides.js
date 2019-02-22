const {
  addLessLoader,
  addBabelPlugin,
  override,
  fixBabelImports,
} = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = override(
  // useEslintRc(),
  addBabelPlugin(['babel-plugin-emotion', { sourceMap: true, autoLabel: true }]),
  fixBabelImports('babel-plugin-import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  fixBabelImports('lodash', {
    libraryDirectory: '',
    camel2DashComponentName: false,
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
  config => ({
    ...config,
    plugins: config.plugins.concat([
      ...(PRODUCTION ? [new BundleAnalyzerPlugin()] : []),
    ]),
  }),
);
