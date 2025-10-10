const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'platform',
  remotes: {
    cowCatalog: 'cowCatalog@https://gauravkochhar.github.io/telus-agriculture-cow-catalog/cow-catalog/remoteEntry.js',
    cowDetail: 'cowDetail@https://gauravkochhar.github.io/telus-agriculture-cow-catalog/cow-detail/remoteEntry.js'
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
