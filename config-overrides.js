const { injectBabelPlugin } = require('react-app-rewired');
const rewireESLint = require('react-app-rewire-eslint');
const rewireYAML = require('react-app-rewire-yaml');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = rewireYAML(config, env);
  config = rewireESLint(config, env);
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
      //'@component-background': 'transparent',
    },
  })(config, env);

  return config;
};
