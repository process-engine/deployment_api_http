import {BaseRouter} from '@essential-projects/http_node';
import {restSettings} from '@process-engine/deployment_api_contracts';

import {resolveIdentity} from './../../middlewares/resolve_identity';
import {ImportController} from './import_controller';

import {wrap} from 'async-middleware';

export class ImportRouter extends BaseRouter {

  private _importController: ImportController;

  constructor(importController: ImportController) {
    super();
    this._importController = importController;
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
    this.router.use(wrap(resolveIdentity));
  }

  private registerRoutes(): void {
    const controller: ImportController = this.importController;

    this.router.post(restSettings.paths.importProcessModel, wrap(controller.importProcessModel.bind(controller)));
  }
}
