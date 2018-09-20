import {HttpRequestWithIdentity} from '@essential-projects/http_contracts';
import {IIdentity} from '@essential-projects/iam_contracts';

import {
  IDeploymentApi,
  ImportProcessDefinitionsRequestPayload,
} from '@process-engine/deployment_api_contracts';

import {Response} from 'express';

export class ImportController {
  public config: any = undefined;

  private httpCodeSuccessfulResponse: number = 200;

  private _deploymentService: IDeploymentApi;

  constructor(deploymentApiService: IDeploymentApi) {
    this._deploymentService = deploymentApiService;
  }

  private get deploymentApiService(): IDeploymentApi {
    return this._deploymentService;
  }

  public async importProcessModel(request: HttpRequestWithIdentity, response: Response): Promise<void> {
    const identity: IIdentity = request.identity;
    const payload: ImportProcessDefinitionsRequestPayload = request.body;

    const result: any = await this.deploymentApiService.importBpmnFromXml(identity, payload);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

}
