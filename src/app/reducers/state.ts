import { Client, Contract, Contractor } from 'app/models';
import { RouterState } from 'react-router-redux';
import { Treebeard } from 'react-treebeard';

export interface RootState {
  clients: RootState.ClientState;
  contracts: RootState.ContractState;
  contractors: RootState.ContractorState;
  loading: RootState.LoadingState;
  tree: RootState.TreeState;
  router: RouterState;
}

export namespace RootState {
  export type ClientState = Client[];
  export type ContractState = Contract[];
  export type ContractorState = Contractor[];
  export type LoadingState = Boolean;
  export type TreeState = { data: Treebeard.Data; selected: string };
}
