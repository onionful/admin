const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const { compose, injectBabelPlugin } = require('react-app-rewired');
const rewireESLint = require('react-app-rewire-eslint');
const rewireYAML = require('react-app-rewire-yaml');
const rewireLess = require('react-app-rewire-less');

module.exports = compose(
  rewireYAML,
  rewireESLint,
  config => injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config),
  rewireLess.withLoaderOptions({
    modifyVars: {
      // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
      //'@component-background': 'transparent',
    },
  }),
  config => {
    const eslintFormatter = require('react-dev-utils/eslintFormatter');
    config.module.rules.forEach(({ use = [] }) =>
      use.forEach(({ options }) => {
        if (options.formatter === eslintFormatter) {
          options.formatter = eslintFriendlyFormatter;
        }
      }),
    );
    return config;
  },
);
