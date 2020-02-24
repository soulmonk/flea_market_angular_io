const packageJson = require('../../package.json');
const baseOptions = require('../../baseOptions.json');

export const environment = {
  ...baseOptions,
  envName: 'PROD',
  hmr: false,
  production: true,
  log: false,
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
