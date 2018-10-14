import { Contractor } from 'app/models/Contractor';
import { Client } from 'app/models/Client';
import { Checkable } from 'app/models/Checkable';

export interface ContractData extends Omit<Contract, 'contractors' | 'checked'> {
  contractors: Omit<Contractor, 'checked'>[];
  client: Omit<Client, 'contracts' | 'checked'>;
}

export interface Contract extends Checkable {
  id: number;
  subject: string;
  numberOfErrors: number;
  numberOfWords: number;
  contractors: number[];
}
