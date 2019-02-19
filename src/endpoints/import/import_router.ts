import {BaseRouter} from '@essential-projects/http_node';
import {IIdentityService} from '@essential-projects/iam_contracts';

import {restSettings} from '@process-engine/deployment_api_contracts';
import {createResolveIdentityMiddleware, MiddlewareFunction} from '../../middlewares/index';
import {ImportController} from './import_controller';

import {wrap} from 'async-middleware';

export class ImportRouter extends BaseRouter {

  private _importController: ImportController;
  private _identityService: IIdentityService;

  constructor(importController: ImportController, identityService: IIdentityService) {
    super();
    this._importController = importController;
    this._identityService = identityService;
  }

  private get importController(): ImportController {
    return this._importController;
  }

  public get baseRoute(): string {
    return 'api/deployment/v1';
  }

  public async initializeRouter(): Promise<void> {
    this.registerMiddlewares();
    this.registerRoutes();
  }

  private registerMiddlewares(): void {
    const resolveIdentity: MiddlewareFunction = createResolveIdentityMiddleware(this._identityService);
    this.router.use(wrap(resolveIdentity));
  }

  private registerRoutes(): void {
    const controller: ImportController = this.importController;

    this.router.post(restSettings.paths.importProcessModel, wrap(controller.importProcessModel.bind(controller)));
  }
}
