import { IRule } from '@nestcloud2/consul-loadbalance';
import { ILoadbalancer, IServer } from '@nestcloud2/common';

export class CustomRule implements IRule {
    private loadbalancer;

    choose(): IServer {
        const reachableServers = this.loadbalancer.servers.filter(server => server.state.isAlive());
        if (reachableServers.length) {
            return reachableServers[0];
        }

        return null;
    }

    init(loadbalancer: ILoadbalancer): any {
        this.loadbalancer = loadbalancer;
    }
}
