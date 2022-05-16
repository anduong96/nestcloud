import { DynamicModule, Module } from '@nestjs/common';
import { SCHEDULE, Scanner } from '../common';

import { DiscoveryModule } from '@nestjs/core';
import { Schedule } from './schedule';
import { ScheduleExplorer } from './schedule.explorer';
import { ScheduleWrapper } from './schedule.wrapper';
import { SchedulerMetadataAccessor } from './schedule-metadata.accessor';
import { SchedulerOrchestrator } from './scheduler.orchestrator';
import { SchedulerRegistry } from './scheduler.registry';

@Module({
    imports: [DiscoveryModule],
    providers: [SchedulerMetadataAccessor, SchedulerOrchestrator, Scanner],
})
export class ScheduleModule {
    static forRoot(): DynamicModule {
        const scheduleProvider = {
            provide: SCHEDULE,
            useExisting: Schedule,
        };
        return {
            global: true,
            module: ScheduleModule,
            providers: [ScheduleExplorer, SchedulerRegistry, ScheduleWrapper, Schedule, scheduleProvider],
            exports: [scheduleProvider],
        };
    }
}
