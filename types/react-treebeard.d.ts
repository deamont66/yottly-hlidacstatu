declare module 'react-treebeard' {
  import * as React from 'react';

  export namespace Treebeard {
    export interface Props {
      data: Data | Data[],
      animations?: any,
      onToggle?: (node: any, toggled: boolean) => void,
      decorators?: any,
      style?: any
    }

    export interface Data {
      id?: string,
      name: string,
      children?: Data[],
      toggled?: boolean,
      active?: boolean,
      loading?: boolean,
      decorators?: any,
      animations?: any
    }
  }

  export class Treebeard extends React.Component<Treebeard.Props, any> {
  }

  export namespace decorators {
    export class Loading extends React.Component<any, any>{}
    export class Toggle extends React.Component<any, any>{}
    export class Header extends React.Component<any, any>{}
    export class Container extends React.Component<any, any>{}
  }
}
