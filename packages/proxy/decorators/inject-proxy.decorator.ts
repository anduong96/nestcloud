import { Inject } from '@nestjs/common';
import { PROXY } from '../../common';

export const InjectProxy = () => Inject(PROXY);
