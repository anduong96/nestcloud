import { Etcd3 } from 'etcd3';
import { IEtcd } from '@nestcloud2/common';

export class Etcd extends Etcd3 implements IEtcd {}
