'use strict'

const ImportEndpoint = require('./dist/commonjs/index').Endpoints.Import;
const routerDiscoveryTag = require('@essential-projects/bootstrapper_contracts').routerDiscoveryTag;

function registerInContainer(container) {

  container.register('DeploymentApiImportRouter', ImportEndpoint.ImportRouter)
    .dependencies('DeploymentApiImportController')
    .singleton()
    .tags(routerDiscoveryTag);

  container.register('DeploymentApiImportController', ImportEndpoint.ImportController)
    .dependencies('DeploymentApiService')
    .singleton();
}

module.exports.registerInContainer = registerInContainer;
