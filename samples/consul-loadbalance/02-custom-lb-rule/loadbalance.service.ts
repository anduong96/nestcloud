import { Injectable } from '@nestjs/common';
import { InjectLoadbalance, Loadbalance, ServiceNotExistException } from '@nestcloud2/consul-loadbalance';
import { IServiceNode } from '@nestcloud2/common';

@Injectable()
export class LoadbalanceService {
    constructor(@InjectLoadbalance() private readonly lb: Loadbalance) {}

    chooseYourServiceNode() {
        try {
            const node: IServiceNode = this.lb.choose('your-service-name');
            if (!node) {
                console.log('No available node');
            }
        } catch (e) {
            if (e instanceof ServiceNotExistException) {
                console.log('this service is not exist');
            }
        }
    }
}
