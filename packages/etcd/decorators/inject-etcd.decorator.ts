import { Inject } from '@nestjs/common';
import { ETCD } from '../../common';

export const InjectEtcd = () => Inject(ETCD);
