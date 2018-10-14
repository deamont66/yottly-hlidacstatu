import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ContractActions, ToggleCheckedPayload } from 'app/actions/contracts';
import { Client, ContractData } from 'app/models';

const initialState: RootState.ClientState = [];

export const clientReducer = handleActions<
  RootState.ClientState,
  ContractData | ToggleCheckedPayload
>(
  {
    [ContractActions.Type.ADD_CONTRACT]: (state, action) => {
      if (action.payload) {
        const payload = action.payload as ContractData;
        const clientIndex: number = state.findIndex(
          (client: Client) => client.ico === payload.client.ico
        );
        if (clientIndex < 0) {
          return [
            {
              checked: false,
              ico: payload.client.ico,
              name: payload.client.name,
              contracts: [payload.id]
            },
            ...state
          ];
        } else {
          return state
            .slice(0, clientIndex)
            .concat([
              {
                ...state[clientIndex],
                contracts: [payload.id, ...state[clientIndex].contracts]
              }
            ])
            .concat(state.slice(clientIndex + 1));
        }
      } else {
        return state;
      }
    },
    [ContractActions.Type.TOGGLE_CHECKED]: (state, action) => {
      const payload = action.payload as ToggleCheckedPayload;
      if (payload.type === 'client') {
        const clientIndex: number = state.findIndex((client: Client) => client.ico === payload.id);
        return state
          .slice(0, clientIndex)
          .concat([
            {
              ...state[clientIndex],
              checked: payload.toggled
            }
          ])
          .concat(state.slice(clientIndex + 1));
      } else {
        return state;
      }
    }
  },
  initialState
);
