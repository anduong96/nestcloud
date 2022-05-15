import { IncomingMessage } from 'http';
import { IServer } from '@nestcloud2/common';

export interface Request extends IncomingMessage {
    proxy?: {
        id: string;
        server?: IServer;
        uri: string;
        service?: string;
        parameters?: { [key: string]: string | number };
    };
}
