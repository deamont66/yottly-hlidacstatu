import { combineReducers } from 'redux';
import { RootState } from './state';
import { routerReducer, RouterState } from 'react-router-redux';
import { clientReducer } from 'app/reducers/clients';
import { contractReducer } from 'app/reducers/contract';
import { contractorReducer } from 'app/reducers/contractor';
import { loadingReducer } from 'app/reducers/loading';
import { treeReducer } from 'app/reducers/tree';

export { RootState, RouterState };

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  router: routerReducer as any,
  clients: clientReducer as any,
  contracts: contractReducer as any,
  contractors: contractorReducer as any,
  loading: loadingReducer as any,
  tree: treeReducer as any
});
