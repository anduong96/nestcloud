import { get } from 'lodash';
import { Rule } from '../interfaces/rule.interface';
import { ILoadbalancer } from '@nestcloud2/common';
import { Server } from '../server';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoundRobinRule implements Rule {
    protected loadbalancer: ILoadbalancer;
    private counter = 0;

    init(loadbalancer: ILoadbalancer) {
        this.loadbalancer = loadbalancer;
    }

    choose(): Server {
        let count = 0;
        let server = null;
        while (count++ < 10) {
            const reachableServers = this.loadbalancer.servers.filter(server => server.state.isAlive());
            const allServers = this.loadbalancer.servers;
            const upCount = reachableServers.length;
            const serverCount = allServers.length;

            if (upCount === 0 || serverCount === 0) {
                return null;
            }

            const nextServerIndex = this.incrementAndGetModulo(serverCount);
            server = allServers[nextServerIndex];

            if (server === null) {
                continue;
            }

            if (get(server, 'state') && server.state.isAlive()) {
                return server;
            }

            // Next.
            server = null;
        }

        return server;
    }

    protected incrementAndGetModulo(modulo) {
        return (this.counter = (this.counter + 1) % modulo);
    }
}
