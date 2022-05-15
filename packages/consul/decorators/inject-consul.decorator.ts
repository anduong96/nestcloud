import { Inject } from '@nestjs/common';
import { CONSUL } from '@nestcloud2/common';

export const InjectConsul = () => Inject(CONSUL);
