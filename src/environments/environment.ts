const packageJson = require('../../package.json');
const baseOptions = require('../../baseOptions.json');

export const environment = {
  appName: 'extended',
  ...baseOptions,
  apiServers: {
    auth: 'http://localhost:3030',
    financeStats: 'http://localhost:3031'
  },
  envName: 'DEV',
  hmr: false,
  production: false,
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies.typescript
  }
};
