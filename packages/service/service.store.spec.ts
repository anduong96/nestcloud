import { ServiceStore } from './service.store';
import * as Consul from 'consul';
import { expect } from 'chai';
import { IServiceServer } from '@nestcloud2/common';

describe('Consul Service Store', () => {
    let consul: Consul;
    let store: ServiceStore;

    before(async () => {
        consul = new Consul({ host: '127.0.0.1', port: 8500, promisify: true });
        await consul.agent.service.register({
            id: 'my-consul-service',
            name: 'my-consul-service',
            address: '127.0.0.1',
            port: 8500,
            check: {
                http: 'http://127.0.0.1:8500',
                interval: '5s',
            },
            status: 'passing',
        });
        store = new ServiceStore(consul);
        await store.init();
    });

    it(`Store.getServiceNames()`, () => {
        expect(store.getServiceNames().includes('my-consul-service')).equal(true);
    });

    it(`Store.getServices()`, () => {
        const services = store.getServices();
        const nodes = services['my-consul-service'];
        expect(nodes.length).equal(1);
    });

    it(`Store.getServiceServers()`, () => {
        const nodes = store.getServiceServers('my-consul-service');
        expect(nodes.length).equal(1);
    });

    it(`Store.watchServiceList()`, async () => {
        const services: string[] = await new Promise(resolve => {
            store.watchServiceList((services: string[]) => {
                resolve(services);
            });
            consul.agent.service.register({
                id: 'my-consul-service-2',
                name: 'my-consul-service-2',
                address: '127.0.0.1',
                port: 8500,
                check: {
                    http: 'http://127.0.0.1:8500',
                    interval: '5s',
                },
                status: 'passing',
            });
        });
        await consul.agent.service.deregister({ id: 'my-consul-service-2' });
        expect(services.includes('my-consul-service') && services.includes('my-consul-service')).equal(true);
    });

    it(`Store.watch()`, async () => {
        const nodes: IServiceServer[] = await new Promise(resolve => {
            store.watch('my-consul-service-3', (nodes: IServiceServer[]) => {
                resolve(nodes);
            });
            consul.agent.service.register({
                id: 'my-consul-service-3',
                name: 'my-consul-service-3',
                address: '127.0.0.1',
                port: 8500,
                check: {
                    http: 'http://127.0.0.1:8500',
                    interval: '5s',
                },
                status: 'passing',
            });
        });
        await consul.agent.service.deregister({ id: 'my-consul-service-3' });
        expect(nodes.length).equal(1);
    });

    after(async () => {
        await consul.agent.service.deregister({ id: 'my-consul-service' });
    });
});
