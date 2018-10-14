import * as React from 'react';
import * as style from './style.css';
import { RootState } from 'app/reducers';
import { Table } from 'app/components';

const TABLE_HEADER = ['Název plátce', 'Předmět zakázky', 'Počet chyb', 'Počet slov'];

export namespace Footer {
  export interface Props {
    clients: RootState.ClientState;
    contracts: RootState.ContractState;
  }
}

export class ClientTable extends React.Component<Footer.Props> {
  render() {
    const { clients, contracts } = this.props;
    const clientsData = clients.map((client) =>
      client.contracts.map((contractorId) => {
        const contract = contracts.find((contract) => contractorId === contract.id)!;
        if (contract)
          return [client.name, contract.subject, contract.numberOfErrors, contract.numberOfWords];
        else return [client.name, 'Nenalezeno'];
      })
    );
    const rows = [].concat.apply([], clientsData).map((cols: string[]) => ({ cols: cols }));
    return (
      <div className={style.clientTableContainer}>
        <Table className={style.clientTable} head={TABLE_HEADER} rows={rows} />
      </div>
    );
  }
}
