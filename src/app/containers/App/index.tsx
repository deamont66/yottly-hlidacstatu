import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { ContractActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import { Loader, ClientTable, WatcherTree, AddContractForm, CheckStatus } from 'app/components';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    actions: ContractActions;
    loading: RootState.LoadingState;
    clients: RootState.ClientState;
    contracts: RootState.ContractState;
    contractors: RootState.ContractorState;
    tree: RootState.TreeState;
  }
}

export class App extends React.Component<App.Props, any> {
  componentDidMount() {
    this.props.actions.loadContracts();
  }

  render() {
    const { loading, clients, contracts, contractors, tree, actions } = this.props;

    return (
      <div className={style.normal}>
        <div className={style['split-container']}>
          <WatcherTree treeData={tree.data} onToggle={actions.toggleActive} />
          <div className={style.right}>
            <ClientTable clients={clients} contracts={contracts} />
            <CheckStatus
              treeSelectedId={tree.selected}
              clients={clients}
              contracts={contracts}
              contractors={contractors}
              toggleCheckedAll={actions.toggleCheckedAll}
            />
            {!loading && (
              <AddContractForm
                treeSelectedId={tree.selected}
                clients={clients}
                contracts={contracts}
                contractors={contractors}
                updateTreeThunk={actions.updateTreeThunk}
                addContract={actions.addContract}
              />
            )}
            {loading && <Loader />}
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ({
  loading,
  clients,
  contracts,
  contractors,
  tree
}: RootState): Pick<App.Props, 'loading' | 'clients' | 'contracts' | 'contractors' | 'tree'> => {
  return { loading, clients, contracts, contractors, tree };
};

export const mapDispatchToProps = (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
  actions: bindActionCreators(omit(ContractActions, 'Type'), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
