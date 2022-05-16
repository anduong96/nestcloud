import { Inject } from '@nestjs/common';
import { SERVICE } from '../../common';

export const InjectService = () => Inject(SERVICE);
