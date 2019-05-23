import {BaseRouter} from '@essential-projects/http_node';
import {IIdentityService} from '@essential-projects/iam_contracts';

import {restSettings} from '@process-engine/deployment_api_contracts';

import {wrap} from 'async-middleware';
import {DeploymentApiController} from './deployment_api_controller';
import {createResolveIdentityMiddleware} from './middlewares/index';

export class DeploymentApiRouter extends BaseRouter {

  private deploymentApiController: DeploymentApiController;
  private identityService: IIdentityService;

  constructor(deploymentApiController: DeploymentApiController, identityService: IIdentityService) {
    super();
    this.deploymentApiController = deploymentApiController;
    this.identityService = identityService;
  }

  public get baseRoute(): string {
    return 'api/deployment/v1';
  }

  public async initializeRouter(): Promise<void> {
    this.registerMiddlewares();
    this.registerRoutes();
  }

  private registerMiddlewares(): void {
    const resolveIdentity = createResolveIdentityMiddleware(this.identityService);
    this.router.use(wrap(resolveIdentity));
  }

  private registerRoutes(): void {
    const controller = this.deploymentApiController;

    this.router.post(restSettings.paths.importProcessModel, wrap(controller.importProcessModel.bind(controller)));
    this.router.post(restSettings.paths.undeployProcessModel, wrap(controller.undeployProcessModel.bind(controller)));
  }

}
