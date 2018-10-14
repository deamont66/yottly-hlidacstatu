export const styles = {
  tree: {
    base: {
      listStyle: 'none',
      boxShadow: '0 5px 20px 0px rgba(0, 0, 0, 0.1)',
      margin: 0,
      padding: 0,
      color: '#9DA5AB',
      fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
      fontSize: '14px'
    },
    node: {
      base: {
        position: 'relative'
      },
      link: {
        cursor: 'pointer',
        padding: '5px 10px',
        position: 'relative',
        display: 'block'
      },
      activeLink: {
        backgroundColor: 'rgba(175, 47, 47, 0.15)'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '34px',
          width: '34px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },
        height: 14,
        width: 14,
        arrow: {
          fill: 'rgba(175, 47, 47, 0.25)',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#4d4d4d',
          padding: '5px 10px',
          cursor: 'pointer'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        color: '#E2C089'
      }
    }
  }
};
