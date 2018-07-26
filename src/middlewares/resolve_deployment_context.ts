import {UnauthorizedError} from '@essential-projects/errors_ts';
import {DeploymentRequest} from '@process-engine/deployment_api_contracts';
import {NextFunction, Response} from 'express';

export function resolveDeploymentContext(request: DeploymentRequest, response: Response, next: NextFunction): void {
  const bearerToken: string = request.get('authorization');

  if (!bearerToken) {
    throw new UnauthorizedError('No auth token provided!');
  }

  request.deploymentContext = {
    identity: bearerToken.substr('Bearer '.length),
    internationalization: request.get('accept-language'),
  };

  next();
}
