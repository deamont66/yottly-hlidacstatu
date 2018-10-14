import { Checkable } from 'app/models/Checkable';

export interface Contractor extends Checkable {
  ico: number;
  name: string;
}
