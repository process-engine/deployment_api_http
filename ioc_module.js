'use strict'

const {DeploymentApiController, DeploymentApiRouter} = require('./dist/commonjs/index');
const routerDiscoveryTag = require('@essential-projects/bootstrapper_contracts').routerDiscoveryTag;

function registerInContainer(container) {

  container.register('DeploymentApiImportRouter', DeploymentApiRouter)
    .dependencies('DeploymentApiImportController', 'IdentityService')
    .singleton()
    .tags(routerDiscoveryTag);

  container.register('DeploymentApiImportController', DeploymentApiController)
    .dependencies('DeploymentApiService')
    .singleton();
}

module.exports.registerInContainer = registerInContainer;
