import { AmUserInfo } from '../openapi/models';

export interface UpdateUserParams {
  readonly id: number;
  readonly body: AmUserInfo;
}
