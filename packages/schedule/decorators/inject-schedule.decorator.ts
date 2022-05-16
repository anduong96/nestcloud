import { Inject } from '@nestjs/common';
import { SCHEDULE } from '../../common';

export const InjectSchedule = () => Inject(SCHEDULE);
