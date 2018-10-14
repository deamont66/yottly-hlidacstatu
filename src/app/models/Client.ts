import { Checkable } from 'app/models/Checkable';

export interface Client extends Checkable {
  name: string;
  ico: number;
  contracts: number[];
}
