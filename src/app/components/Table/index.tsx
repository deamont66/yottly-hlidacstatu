import * as React from 'react';
import classNames from 'classnames';

export namespace Table {
  export interface Props {
    className?: string;
    head: any[];
    rows: Row[];
  }

  export interface Row {
    cols: any[];
  }
}

export class Table extends React.Component<Table.Props> {
  render() {
    const { head, rows, className } = this.props;

    return (
      <table className={className}>
        <thead>
          <tr>
            {head.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.cols.map((content, index) => (
                <td key={index} className={classNames({ number: typeof content === 'number' })}>
                  {content}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
