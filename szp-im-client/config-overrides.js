const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

  module.exports = function override(config, env) {
    config = injectBabelPlugin(
     ['import', { libraryName: 'antd-mobile', style: true }], // change importing css to less
      config,
    );
  config = rewireLess.withLoaderOptions({
     javascriptEnabled: true,
     modifyVars: { "@primary-color": "#F8F8FF" }
   })(config, env);
    return config;
  };