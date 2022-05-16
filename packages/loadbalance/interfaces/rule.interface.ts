import { ILoadbalancer, IServer } from '../../common';

export interface Rule {
    init(loadbalancer: ILoadbalancer);

    choose(): IServer;
}
