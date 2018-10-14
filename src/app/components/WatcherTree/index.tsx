import * as React from 'react';
import * as style from './style.css';

import { Treebeard, decorators } from 'react-treebeard';
import { styles } from './treeStyles';

/*
 * Selected Tree library unfortunately sucks :(
 * There are no type definitions, no way to pass custom payload (only string id which
 * is then used as key for li element) and styling was broken by some newer version.
 *
 * At this point I would probably start searching for different library
 * or start writing my own (but I feel like that is out of scope this assignment)
 */

/**
 * There is no activeLink logic in default Container decorator.
 * This is my attempt to add this by using composition.
 */
const OldContainer = decorators.Container;

class MyContainer extends React.Component<any, any> {
  render() {
    const { node } = this.props;

    const props = {
      ...this.props
    };
    if (node.active) {
      props.style = {
        ...this.props.style,
        container: { ...this.props.style.container, ...this.props.style.activeLink }
      };
    }
    return <OldContainer {...props} />;
  }
}

decorators.Container = MyContainer;

export namespace WatcherTree {
  export interface Props {
    treeData: Treebeard.Data;
    onToggle: Function;
  }
}

export class WatcherTree extends React.Component<WatcherTree.Props> {
  onToggle = (node: Treebeard.Data, toggled: boolean) => {
    const nodeId = node.id || '';
    this.props.onToggle({ id: nodeId, toggled });
  };

  render() {
    const { treeData } = this.props;
    return (
      <div className={style.treeContainer}>
        <Treebeard
          data={treeData}
          decorators={decorators}
          style={styles}
          onToggle={this.onToggle}
        />
      </div>
    );
  }
}
