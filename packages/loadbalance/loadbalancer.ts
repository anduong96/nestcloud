import { ILoadbalancer, IServer } from '../common';

import { Rule } from './interfaces/rule.interface';
import { Server } from './server';
import { ServerState } from './server-state';

export class Loadbalancer implements ILoadbalancer {
    constructor(
        private readonly id: string,
        private readonly name: string,
        public servers: Server[],
        private rule: Rule,
    ) {
        this.servers = this.initialServers(this.servers);
    }

    public chooseService(): IServer {
        if (!this.rule) {
            throw new Error('The rule is not exist.');
        }

        this.rule.init(this);
        return this.rule.choose();
    }

    public updateRule(rule: Rule) {
        this.rule = rule;
        this.rule.init(this);
    }

    public addServer(server: Server) {
        if (server) {
            this.servers.push(this.initialServer(server));
        }
    }

    public removeServer(serverId: string) {
        if (serverId) {
            this.servers = this.servers.filter(server => server.id !== serverId);
        }
    }

    public getServer(serverId: string): Server {
        for (let i = 0; i < this.servers.length; i++) {
            if (this.servers[i].id === serverId) {
                return this.servers[i];
            }
        }
    }

    private initialServers(servers: Server[]): Server[] {
        if (!servers) {
            return [];
        }
        return servers.map(server => this.initialServer(server));
    }

    private initialServer(server: Server): Server {
        if (!server.address || !server.port) {
            throw new Error('Service does not has address or port');
        }

        if (!server.state) {
            server.state = new ServerState();
        }
        return server;
    }
}
