const { compose, injectBabelPlugin } = require('react-app-rewired');
const rewireESLint = require('react-app-rewire-eslint');
const rewireYAML = require('react-app-rewire-yaml');
const rewireLess = require('react-app-rewire-less');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = compose(
  rewireYAML,
  (config, env) =>
    rewireESLint(config, env, options =>
      Object.assign(options, { eslintPath: require.resolve('eslint') }),
    ),
  config => injectBabelPlugin(['emotion', { sourceMap: true, autoLabel: true }], config),
  config => injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config),
  config => ({ ...config, plugins: config.plugins.concat(new HardSourceWebpackPlugin()) }),
  rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: {
      // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
      //'@component-background': 'transparent',
    },
  }),
);
