import { Inject } from '@nestjs/common';
import { SERVICE } from '@nestcloud2/common';

export const InjectService = () => Inject(SERVICE);
