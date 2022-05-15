import { ILoadbalancer, IServer } from '@nestcloud2/common';

export interface Rule {
    init(loadbalancer: ILoadbalancer);

    choose(): IServer;
}
