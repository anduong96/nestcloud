import { Inject } from '@nestjs/common';
import { ETCD } from '@nestcloud2/common';

export const InjectEtcd = () => Inject(ETCD);
