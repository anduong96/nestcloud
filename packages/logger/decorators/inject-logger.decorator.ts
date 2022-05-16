import 'reflect-metadata';
import { Inject } from '@nestjs/common';
import { LOGGER } from '../../common';

export const InjectLogger = () => Inject(LOGGER);
