import { Inject } from '@nestjs/common';
import { LOADBALANCE } from '../../common';

export const InjectLoadbalance = () => Inject(LOADBALANCE);
