import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ContractActions } from 'app/actions/contracts';

const initialState: RootState.LoadingState = true;

export const loadingReducer = handleActions<RootState.LoadingState, Boolean>(
  {
    [ContractActions.Type.SET_LOADING]: (state, action) => {
      return !!action.payload;
    }
  },
  initialState
);
