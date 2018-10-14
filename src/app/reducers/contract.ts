import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ContractActions, ToggleCheckedPayload } from 'app/actions/contracts';
import { ContractData, Contract } from 'app/models';

const initialState: RootState.ContractState = [];

export const contractReducer = handleActions<
  RootState.ContractState,
  ContractData | ToggleCheckedPayload
>(
  {
    [ContractActions.Type.ADD_CONTRACT]: (state, action) => {
      const payload = action.payload as ContractData;
      return [
        {
          checked: false,
          id: payload.id,
          subject: payload.subject,
          numberOfErrors: payload.numberOfErrors,
          numberOfWords: payload.numberOfWords,
          contractors: payload.contractors.map((contractor) => contractor.ico)
        },
        ...state
      ];
    },
    [ContractActions.Type.TOGGLE_CHECKED]: (state, action) => {
      const payload = action.payload as ToggleCheckedPayload;
      if (payload.type === 'contract') {
        const contractIndex: number = state.findIndex(
          (contract: Contract) => contract.id === payload.id
        );
        return state
          .slice(0, contractIndex)
          .concat([
            {
              ...state[contractIndex],
              checked: payload.toggled
            }
          ])
          .concat(state.slice(contractIndex + 1));
      } else {
        return state;
      }
    }
  },
  initialState
);
