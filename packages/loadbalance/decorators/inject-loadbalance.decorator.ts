import { Inject } from '@nestjs/common';
import { LOADBALANCE } from '@nestcloud2/common';

export const InjectLoadbalance = () => Inject(LOADBALANCE);
