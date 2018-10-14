import { createAction } from 'redux-actions';
import { Checkable, Client, Contract, ContractData, Contractor } from 'app/models';
import { RootState } from 'app/reducers';

const NUMBER_OF_LOADED_CONTRACTS = 15;

interface APISearchData {
  items: APISearchItem[];
}

interface APISearchItem {
  identifikator: {
    idSmlouvy: string;
  };
}

interface APIContractData {
  predmet: string;
  Prilohy: APIContractAttachment[];
  Issues: any[];
  Platce: {
    ico: string;
    nazev: string;
  };
  Prijemce: APIContractorData[];
}

interface APIContractorData {
  ico: string;
  nazev: string;
}

interface APIContractAttachment {
  WordCount: number;
}

export interface ToggleActivePayload {
  id: string;
  toggled: boolean;
}

export interface ToggleCheckedPayload {
  id: number;
  type: 'client' | 'contract' | 'contractor';
  toggled: boolean;
}

export namespace ContractActions {
  export enum Type {
    ADD_CONTRACT = 'ADD_CONTRACT',
    LOADING_ERROR = 'LOADING_ERROR',
    SET_LOADING = 'SET_LOADING',
    TOGGLE_CHECKED = 'TOGGLE_CHECKED',
    TOGGLE_ACTIVE = 'TOGGLE_ACTIVE',
    UPDATE_TREE = 'UPDATE_TREE'
  }

  export const loadContracts = () => async (dispatch: Function) => {
    dispatch(setLoading(true));

    try {
      const response = await fetch('api/search-result.json');
      const data: APISearchData = await response.json();
      const items: number[] = data.items
        .slice(0, NUMBER_OF_LOADED_CONTRACTS)
        .map((item) => parseInt(item.identifikator.idSmlouvy));

      console.log(items);

      const pContracts: Promise<ContractData>[] = items.map(async (contractId) => {
        const response = await fetch(`api/contract-${contractId}.json`);
        const data: APIContractData = await response.json();

        return {
          id: contractId,
          subject: data.predmet,
          numberOfErrors: data.Issues.length,
          numberOfWords: data.Prilohy.reduce((sum, attachment) => sum + attachment.WordCount, 0),
          contractors: data.Prijemce.map((d) => ({
            ico: parseInt(d.ico),
            name: d.nazev
          })),
          client: {
            ico: parseInt(data.Platce.ico),
            name: data.Platce.nazev
          }
        } as ContractData;
      });

      const contracts = await Promise.all(pContracts);
      contracts.forEach((contract: ContractData) => {
        dispatch(addContract(contract));
      });
    } catch (e) {
      loadingError(e);
    } finally {
      dispatch(updateTreeThunk());
      dispatch(setLoading(false));
    }
  };

  export const toggleCheckedAll = (
    checkableArray: { checkable: Checkable; type: string }[],
    toggled: boolean
  ) => (dispatch: Function) => {
    checkableArray.forEach(({ checkable, type }) => {
      switch (type) {
        case 'contract':
          const contract = checkable as Contract;
          dispatch(toggleChecked({ id: contract.id, type: 'contract', toggled: toggled }));
          break;
        case 'client':
          const client = checkable as Client;
          dispatch(toggleChecked({ id: client.ico, type: 'client', toggled: toggled }));
          break;
        case 'contractor':
          const contractor = checkable as Contractor;
          dispatch(toggleChecked({ id: contractor.ico, type: 'contractor', toggled: toggled }));
          break;
      }
    });
  };

  export const updateTreeThunk = () => (dispatch: Function, getState: () => RootState) => {
    const { clients, contracts, contractors } = getState();
    dispatch(updateTree({ clients, contracts, contractors }));
  };

  export const updateTree = createAction<Pick<RootState, 'clients' | 'contracts' | 'contractors'>>(
    Type.UPDATE_TREE
  );
  export const toggleActive = createAction<ToggleActivePayload>(Type.TOGGLE_ACTIVE);
  export const toggleChecked = createAction<ToggleCheckedPayload>(Type.TOGGLE_CHECKED);
  export const loadingError = createAction<Error>(Type.LOADING_ERROR);
  export const addContract = createAction<ContractData>(Type.ADD_CONTRACT);
  export const setLoading = createAction<Boolean>(Type.SET_LOADING);
}

export type ContractActions = Omit<typeof ContractActions, 'Type'>;
