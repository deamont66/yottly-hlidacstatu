import * as React from 'react';
import * as style from './style.css';
import { RootState } from 'app/reducers';
import { Client, Contract, ContractData, Contractor } from 'app/models';
import { getCheckableByTreeId } from 'app/components/CheckStatus';

export namespace AddContractForm {
  export interface Props {
    treeSelectedId: string;
    clients: RootState.ClientState;
    contracts: RootState.ContractState;
    contractors: RootState.ContractorState;
    addContract: Function;
    updateTreeThunk: Function;
  }

  export interface State extends ContractData {}
}

export class AddContractForm extends React.Component<AddContractForm.Props, AddContractForm.State> {
  state: AddContractForm.State = {
    id: 0,
    subject: '',
    numberOfErrors: 0,
    numberOfWords: 0,
    client: {
      ico: 0,
      name: ''
    },
    contractors: [
      {
        ico: 0,
        name: ''
      }
    ]
  };

  static getDerivedStateFromProps(
    props: AddContractForm.Props,
    state: AddContractForm.State
  ): AddContractForm.State | null {
    const { treeSelectedId, clients, contracts, contractors } = props;
    const checkable = getCheckableByTreeId(treeSelectedId, clients, contracts, contractors);
    if (checkable) {
      if (checkable.type === 'client') {
        const client = checkable.checkable as Client;
        return { ...state, client: { ico: client.ico, name: client.name } };
      } else if (checkable.type === 'contractor') {
        const contractor = checkable.checkable as Contractor;
        return { ...state, contractors: [{ ico: contractor.ico, name: contractor.name }] };
      } else if (checkable.type === 'contract') {
        const contract = checkable.checkable as Contract;
        return {
          ...state,
          id: contract.id,
          subject: contract.subject,
          numberOfErrors: contract.numberOfErrors,
          numberOfWords: contract.numberOfWords
        };
      }
    }
    return null;
  }

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.addContract({ ...this.state });
          this.props.updateTreeThunk();
        }}
        className={style.form}
      >
        <h2>Přidat smlouvu</h2>
        <label htmlFor="contractId"># smlouvy</label>
        <input
          id="contractId"
          type="number"
          value={this.state.id}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            this.setState((state) => ({ ...state, id: val }));
          }}
        />

        <label htmlFor="contractErrors"># chyb</label>
        <input
          id="contractErrors"
          type="number"
          value={this.state.numberOfErrors}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            this.setState((state) => ({ ...state, numberOfErrors: val }));
          }}
        />

        <label htmlFor="contractWords"># slov</label>
        <input
          id="contractWords"
          type="number"
          value={this.state.numberOfWords}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            this.setState((state) => ({ ...state, numberOfWords: val }));
          }}
        />

        <label htmlFor="contractSubject">Předmět smlouvy</label>
        <input
          id="contractId"
          type="text"
          value={this.state.subject}
          onChange={(e) => {
            const val = e.target.value;
            this.setState((state) => ({ ...state, subject: val }));
          }}
        />

        <h3>Zadavatel</h3>
        <label htmlFor="clientIco">ICO</label>
        <input
          id="clientIco"
          type="number"
          value={this.state.client.ico}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            this.setState((state) => ({ ...state, client: { ...state.client, ico: val } }));
          }}
        />

        <label htmlFor="clientName">Jméno</label>
        <input
          id="clientName"
          type="name"
          value={this.state.client.name}
          onChange={(e) => {
            const val = e.target.value;
            this.setState((state) => ({ ...state, client: { ...state.client, name: val } }));
          }}
        />

        <h3>Výherce</h3>
        <label htmlFor="contractorIco">ICO</label>
        <input
          id="contractorIco"
          type="number"
          value={this.state.contractors[0].ico}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            this.setState((state) => ({
              ...state,
              contractors: [{ ...state.contractors[0], ico: val }]
            }));
          }}
        />

        <label htmlFor="contractorName">Jméno</label>
        <input
          id="contractorName"
          type="name"
          value={this.state.contractors[0].name}
          onChange={(e) => {
            const val = e.target.value;
            this.setState((state) => ({
              ...state,
              contractors: [{ ...state.contractors[0], name: val }]
            }));
          }}
        />

        <button type="submit">Přidat</button>
      </form>
    );
  }
}
