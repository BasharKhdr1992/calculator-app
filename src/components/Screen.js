import React from 'react';
import './Screen.css';

const Screen = ({ result, theme }) => {
  let styles = {
    backgroundColor: theme.screenBg,
  };

  switch (theme.theme_id) {
    case 0: {
      styles = { ...styles, color: theme.whiteText };
      break;
    }
    case 1: {
      styles = { ...styles, color: theme.darkText };
      break;
    }
    case 2: {
      styles = { ...styles, color: theme.yellowText };
      break;
    }
    default:
      break;
  }

  return (
    <div className="screen" role="main" style={styles}>
      {result}
    </div>
  );
};

export default Screen;
