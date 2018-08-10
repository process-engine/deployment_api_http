import {
  DeploymentContext,
  DeploymentRequest,
  IDeploymentApiService,
  ImportProcessDefinitionsRequestPayload,
} from '@process-engine/deployment_api_contracts';

import {Response} from 'express';

export class ImportController {
  public config: any = undefined;

  private httpCodeSuccessfulResponse: number = 200;

  private _deploymentService: IDeploymentApiService;

  constructor(deploymentApiService: IDeploymentApiService) {
    this._deploymentService = deploymentApiService;
  }

  private get deploymentApiService(): IDeploymentApiService {
    return this._deploymentService;
  }

  public async importProcessModel(request: DeploymentRequest, response: Response): Promise<void> {
    const context: DeploymentContext = request.deploymentContext;
    const payload: ImportProcessDefinitionsRequestPayload = request.body;

    const result: any = await this.deploymentApiService.importBpmnFromXml(context, payload);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

}
