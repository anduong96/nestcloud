import { Inject } from '@nestjs/common';
import { PROXY } from '@nestcloud2/common';

export const InjectProxy = () => Inject(PROXY);
