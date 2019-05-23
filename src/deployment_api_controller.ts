import {HttpRequestWithIdentity} from '@essential-projects/http_contracts';

import {IDeploymentApi, IDeploymentApiHttpController} from '@process-engine/deployment_api_contracts';

import {Response} from 'express';

export class DeploymentApiController implements IDeploymentApiHttpController {

  private httpCodeSuccessfulResponse = 200;

  private deploymentApiService: IDeploymentApi;

  constructor(deploymentApiService: IDeploymentApi) {
    this.deploymentApiService = deploymentApiService;
  }

  public async importProcessModel(request: HttpRequestWithIdentity, response: Response): Promise<void> {
    const identity = request.identity;
    const payload = request.body;

    const result = await this.deploymentApiService.importBpmnFromXml(identity, payload);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async undeployProcessModel(request: HttpRequestWithIdentity, response: Response): Promise<void> {
    const identity = request.identity;
    const processModelId = request.params.process_model_id;

    const result = await this.deploymentApiService.undeploy(identity, processModelId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

}
