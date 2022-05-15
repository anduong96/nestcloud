import { Cron, Interval, NestSchedule, Timeout } from '@nestcloud2/schedule';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleService extends NestSchedule {
    @Cron('0 0 2 * *')
    doCronJob() {}

    @Interval(5000)
    doIntervalJob() {}

    @Timeout(5000)
    doOnceJob() {}
}
