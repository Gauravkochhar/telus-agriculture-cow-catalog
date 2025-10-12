const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'platform',
  remotes: {
    cowCatalog: 'cowCatalog@http://localhost:4201/remoteEntry.js',
    cowDetail: 'cowDetail@http://localhost:4202/remoteEntry.js',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
