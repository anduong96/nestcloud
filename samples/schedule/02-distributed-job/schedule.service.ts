import { Cron, Interval, NestDistributedSchedule, Timeout } from '@nestcloud2/schedule';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleService extends NestDistributedSchedule {
    async tryLock(method: string): Promise<() => void> {
        // If try lock fail, you should throw an error.

        return function() {
            // Release lock here.
        };
    }

    @Cron('0 0 2 * *')
    doCronJob() {}

    @Interval(5000)
    doIntervalJob() {}

    @Timeout(5000)
    doOnceJob() {}
}
