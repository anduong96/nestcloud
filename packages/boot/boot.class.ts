import { IBoot } from '../common';
import { Inject, Injectable } from '@nestjs/common';
import { BootFileLoader } from './boot-file.loader';
import { BootStore } from './boot.store';
import { BootOptions } from './interfaces/boot-options.interface';
import { BOOT_OPTIONS_PROVIDER } from './boot.constants';

@Injectable()
export class Boot implements IBoot {
    constructor(
        @Inject(BOOT_OPTIONS_PROVIDER) private readonly options: BootOptions,
        private readonly fileLoader: BootFileLoader = new BootFileLoader(options),
        private readonly store: BootStore = new BootStore(),
    ) {
        this.store.data = this.fileLoader.load();
    }

    get<T extends any>(path?: string, defaults?: T): T {
        return this.store.get<T>(path, defaults);
    }
}
