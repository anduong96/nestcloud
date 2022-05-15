import Api = require('kubernetes-client');

import { IKubernetes } from '@nestcloud2/common';

export class Kubernetes extends Api.Client1_13 implements IKubernetes {}
