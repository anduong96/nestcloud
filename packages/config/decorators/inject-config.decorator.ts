import { Inject } from '@nestjs/common';
import { CONFIG } from '../../common';

export const InjectConfig = () => Inject(CONFIG);
