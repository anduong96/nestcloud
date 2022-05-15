import { Inject } from '@nestjs/common';
import { CONFIG } from '@nestcloud2/common';

export const InjectConfig = () => Inject(CONFIG);
