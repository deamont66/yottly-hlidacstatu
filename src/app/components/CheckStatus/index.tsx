import * as React from 'react';
import * as style from './style.css';
import { RootState } from 'app/reducers';
import { Checkable, Client } from 'app/models';

export const getCheckableArrayFromTreeId = (
  treeId: string,
  clients: RootState.ClientState,
  contracts: RootState.ContractState,
  contractors: RootState.ContractorState
): { checkable: Checkable; type: string }[] => {
  if (treeId.startsWith('client_')) {
    let client: Client | undefined;
    if (treeId.startsWith('client_contracts_')) {
      client = clients.find((c) => c.ico === parseInt(treeId.substr(17)));
    } else {
      client = clients.find((c) => c.ico === parseInt(treeId.substr(7)));
    }
    if (client) {
      const clientContracts = contracts.filter((c) => (client as Client).contracts.includes(c.id));

      if (treeId.startsWith('client_contracts_')) {
        return [...clientContracts.map((c) => ({ checkable: c, type: 'contract' }))];
      } else {
        return [
          { checkable: client, type: 'client' },
          ...clientContracts.map((c) => ({ checkable: c, type: 'contract' }))
        ];
      }
    } else {
      return [];
    }
  } else if (treeId.startsWith('contract_')) {
    const contract = contracts.find((c) => c.id === parseInt(treeId.substr(9)));
    return contract ? [{ checkable: contract, type: 'contract' }] : [];
  } else if (treeId.startsWith('contractor_')) {
    const contractor = contractors.find((c) => c.ico === parseInt(treeId.substr(11)));
    return contractor ? [{ checkable: contractor, type: 'contractor' }] : [];
  } else if (treeId === 'clients') {
    return [...clients.map((c) => ({ checkable: c, type: 'client' }))];
  } else if (treeId === 'contractors') {
    return [...contractors.map((c) => ({ checkable: c, type: 'contractor' }))];
  } else if (treeId === 'root') {
    return [
      ...clients.map((c) => ({ checkable: c, type: 'client' })),
      ...contracts.map((c) => ({ checkable: c, type: 'contract' })),
      ...contractors.map((c) => ({ checkable: c, type: 'contractor' }))
    ];
  } else {
    return [];
  }
};

export const getCheckableByTreeId = (
  treeId: string,
  clients: RootState.ClientState,
  contracts: RootState.ContractState,
  contractors: RootState.ContractorState
): { checkable: Checkable; type: string } | null => {
  if (treeId.startsWith('client_')) {
    const client = clients.find((c) => c.ico === parseInt(treeId.substr(7)));
    return client ? { checkable: client, type: 'client' } : null;
  }
  if (treeId.startsWith('contract_')) {
    const contract = contracts.find((c) => c.id === parseInt(treeId.substr(9)));
    return contract ? { checkable: contract, type: 'contract' } : null;
  }
  if (treeId.startsWith('contractor_')) {
    const contractor = contractors.find((c) => c.ico === parseInt(treeId.substr(11)));
    return contractor ? { checkable: contractor, type: 'contractor' } : null;
  }
  return null;
};

export const isSingleChecked = (
  treeId: string,
  clients: RootState.ClientState,
  contracts: RootState.ContractState,
  contractors: RootState.ContractorState
): boolean | null => {
  const checkable = getCheckableByTreeId(treeId, clients, contracts, contractors);
  return checkable !== null ? checkable.checkable.checked : null;
};

export const isAllChecked = (checkableArray: { checkable: Checkable; type: string }[]): boolean => {
  return !checkableArray.some(({ checkable }) => !checkable.checked);
};

export namespace CheckStatus {
  export interface Props {
    treeSelectedId: string;
    clients: RootState.ClientState;
    contracts: RootState.ContractState;
    contractors: RootState.ContractorState;
    toggleCheckedAll: Function;
  }
}

export namespace SingleChecked {
  export interface Props {
    singleChecked: boolean | null;
  }
}

export class SingleChecked extends React.Component<SingleChecked.Props> {
  render() {
    const { singleChecked } = this.props;

    if (singleChecked === null) {
      return null;
    }

    if (singleChecked) {
      return (
        <div className={style.message}>
          <div className={style.checked} />
          Vybraná položka byla zkontrolována
        </div>
      );
    } else {
      return (
        <div className={style.message}>
          <div className={style.unchecked} />
          Vybraná položka nebyla zkontrolována
        </div>
      );
    }
  }
}

export class CheckStatus extends React.Component<CheckStatus.Props> {
  renderNotFound() {
    return (
      <div className={style.container}>
        <p className={style.message}>Pro aktuální výběr nebyla nalezena žádná data</p>
      </div>
    );
  }

  render() {
    const { treeSelectedId, clients, contracts, contractors } = this.props;

    const checkableArray = getCheckableArrayFromTreeId(
      treeSelectedId,
      clients,
      contracts,
      contractors
    );
    if (!checkableArray.length) {
      return this.renderNotFound();
    }

    const singleChecked = isSingleChecked(treeSelectedId, clients, contracts, contractors);

    if (isAllChecked(checkableArray)) {
      return (
        <div className={style.container}>
          <SingleChecked singleChecked={singleChecked} />
          <div className={style.message}>
            <div className={style.checked} />V aktálním výběru byly všechny položky zkotrolovány
          </div>
          <button
            className={style.button}
            onClick={() => {
              this.props.toggleCheckedAll(checkableArray, false);
            }}
          >
            Označit jako nezkotrolováno
          </button>
        </div>
      );
    } else {
      return (
        <div className={style.container}>
          <SingleChecked singleChecked={singleChecked} />
          <div className={style.message}>
            <div className={style.unchecked} />V aktuálním výběru se nachází alespoň jedna
            nezkotrolovaná položka
          </div>
          <button
            className={style.button}
            onClick={() => {
              this.props.toggleCheckedAll(checkableArray, true);
            }}
          >
            Označit jako zkotrolováno
          </button>
        </div>
      );
    }
  }
}
