import { Cron, Interval, NestSchedule, Timeout, defaults } from '@nestcloud2/schedule';

import { Injectable } from '@nestjs/common';

defaults.enable = true;
defaults.logger = false;
defaults.maxRetry = -1;
defaults.retryInterval = 5000;

@Injectable()
export class ScheduleService extends NestSchedule {
    @Cron('0 0 2 * *')
    doCronJob() {}

    @Interval(5000)
    doIntervalJob() {}

    @Timeout(5000)
    doOnceJob() {}
}
