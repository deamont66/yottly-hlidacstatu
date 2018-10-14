import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ContractActions, ToggleCheckedPayload } from 'app/actions/contracts';
import { ContractData, Contractor } from 'app/models';

const initialState: RootState.ContractorState = [];

export const contractorReducer = handleActions<
  RootState.ContractorState,
  ContractData | ToggleCheckedPayload
>(
  {
    [ContractActions.Type.ADD_CONTRACT]: (state, action) => {
      const payload = action.payload as ContractData;
      let newState = state;
      payload.contractors.forEach((contractorPayload) => {
        const clientIndex: number = state.findIndex(
          (contractor: Contractor) => contractor.ico === contractorPayload.ico
        );
        if (clientIndex < 0) {
          newState = [
            {
              checked: false,
              ico: contractorPayload.ico,
              name: contractorPayload.name
            },
            ...newState
          ];
        }
      });
      return newState;
    },
    [ContractActions.Type.TOGGLE_CHECKED]: (state, action) => {
      const payload = action.payload as ToggleCheckedPayload;
      if (payload.type === 'contractor') {
        const contractorIndex: number = state.findIndex(
          (contractor: Contractor) => contractor.ico === payload.id
        );
        return state
          .slice(0, contractorIndex)
          .concat([
            {
              ...state[contractorIndex],
              checked: payload.toggled
            }
          ])
          .concat(state.slice(contractorIndex + 1));
      } else {
        return state;
      }
    }
  },
  initialState
);
