import 'reflect-metadata';
import { Inject } from '@nestjs/common';
import { LOGGER } from '@nestcloud2/common';

export const InjectLogger = () => Inject(LOGGER);
