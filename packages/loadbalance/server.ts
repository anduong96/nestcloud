import { IServer } from '../common';
import { ServerState } from './server-state';

export class Server implements IServer {
    id: string;
    name: string;
    address: string;
    port: string;
    zone?: string;
    tags?: Map<string, string>;
    state: ServerState;

    constructor(address: string, port: string) {
        this.address = address || '127.0.0.1';
        this.port = port || '80';
        this.id = `${address}:${port}`;
        this.zone = 'default';
        this.name = this.id;
    }
}
