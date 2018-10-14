import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ContractActions, ToggleActivePayload } from 'app/actions/contracts';
import { Treebeard } from 'react-treebeard';

const initialState: RootState.TreeState = {
  data: {
    id: 'root',
    name: 'Hlídač smluv',
    toggled: true
  },
  selected: ''
};

export const createData = (
  clients: RootState.ClientState,
  contractors: RootState.ContractorState,
  contracts: RootState.ContractState
): Treebeard.Data[] => [
  {
    id: 'clients',
    name: 'Zadavatelé',
    toggled: true,
    children: createDataClients(clients, contracts)
  },
  {
    id: 'contractors',
    name: 'Výherci',
    toggled: true,
    children: createDataContractors(contractors)
  }
];

export const createDataClients = (
  clients: RootState.ClientState,
  contracts: RootState.ContractState
): Treebeard.Data[] =>
  clients.map((client) => ({
    id: `client_${client.ico}`,
    name: client.name,
    children: [
      {
        id: `client_contracts_${client.ico}`,
        name: 'Zakázky',
        children: client.contracts.map((contractId) => {
          const contract = contracts.find((contract) => contract.id === contractId);
          const subject = contract ? contract.subject : 'Nenalezeno';
          return {
            id: `contract_${contractId}`,
            name: subject
          };
        })
      }
    ]
  }));

export const createDataContractors = (contractors: RootState.ContractorState): Treebeard.Data[] =>
  contractors.map((contractor) => ({
    id: `contractor_${contractor.ico}`,
    name: contractor.name
  }));

export const toggleNode = (
  data: Treebeard.Data,
  nodeId: string,
  toggled: boolean
): Treebeard.Data => {
  const isCurrentNode = data.id === nodeId;

  const newData: Treebeard.Data = {
    ...data,
    active: isCurrentNode
  };
  if (data.children) {
    newData.children = data.children.map((data) => toggleNode(data, nodeId, toggled));
  }
  if (isCurrentNode && data.children) {
    newData.toggled = toggled;
  }
  return newData;
};

export const treeReducer = handleActions<
  RootState.TreeState,
  Pick<RootState, 'clients' | 'contracts' | 'contractors'> | boolean | ToggleActivePayload | string
>(
  {
    [ContractActions.Type.SET_LOADING]: (state, action) => {
      return {
        ...state,
        data: { ...state.data, loading: !!action.payload }
      };
    },
    [ContractActions.Type.UPDATE_TREE]: (state, action) => {
      const { clients, contractors, contracts } = action.payload as Pick<
        RootState,
        'clients' | 'contracts' | 'contractors'
      >;
      return {
        data: { ...state.data, children: createData(clients, contractors, contracts) },
        selected: ''
      };
    },
    [ContractActions.Type.TOGGLE_ACTIVE]: (state, action) => {
      const { id, toggled } = action.payload as ToggleActivePayload;
      return {
        data: toggleNode(state.data, id, toggled),
        selected: id
      };
    }
  },
  initialState
);
