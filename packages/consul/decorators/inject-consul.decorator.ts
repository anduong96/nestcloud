import { Inject } from '@nestjs/common';
import { CONSUL } from '../../common';

export const InjectConsul = () => Inject(CONSUL);
