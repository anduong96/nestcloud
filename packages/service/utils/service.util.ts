import { ServiceServer } from '../service.server';
import { IServiceServer, CRITICAL, PASSING, WARNING } from '../../common';
import { get } from 'lodash';

export function handleConsulNodes(nodes): IServiceServer[] {
    return nodes
        .map(node => {
            let status = CRITICAL;
            if (node.Checks.length) {
                status = PASSING;
            }
            for (let i = 0; i < node.Checks.length; i++) {
                const check = node.Checks[i];
                if (check.Status === CRITICAL) {
                    status = CRITICAL;
                    break;
                } else if (check.Status === WARNING) {
                    status = WARNING;
                    break;
                }
            }

            return { ...node, status };
        })
        .map(node => {
            const serviceNode = new ServiceServer(get(node, 'Service.Address', '127.0.0.1'), get(node, 'Service.Port'));
            serviceNode.name = get(node, 'Node.Node');
            serviceNode.tags = get(node, 'Service.Tags', []);
            serviceNode.service = get(node, 'Service.Service');
            serviceNode.status = get(node, 'status', CRITICAL);
            return serviceNode;
        });
}
