const rollupConfig = require('./rollup.config.js');

module.exports = {
  plugins: {
    'postcss-cssnext': {},
    'postcss-url': {
      url: 'inline',
    },
    'postcss-header': {
      header: rollupConfig.banner,
    },
    stylefmt: {},
  },
};
