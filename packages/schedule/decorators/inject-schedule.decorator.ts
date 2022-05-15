import { Inject } from '@nestjs/common';
import { SCHEDULE } from '@nestcloud2/common';

export const InjectSchedule = () => Inject(SCHEDULE);
