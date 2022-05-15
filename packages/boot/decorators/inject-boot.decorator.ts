import { Inject } from '@nestjs/common';
import { BOOT } from '@nestcloud2/common';

export const InjectBoot = () => Inject(BOOT);
