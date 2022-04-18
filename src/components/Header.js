import React from 'react';
import Toggle from './Toggle';

const Header = ({ theme, selectedTheme, handleThemeChange }) => {
  let styles;

  switch (selectedTheme) {
    case 0: {
      styles = { color: theme.whiteText };
      break;
    }
    case 1: {
      styles = { color: theme.darkText };
      break;
    }
    case 2: {
      styles = { color: theme.yellowText };
      break;
    }

    default:
      break;
  }

  return (
    <div className="header">
      <h1 style={styles}>Calc</h1>
      <div className="theme">
        <h2 style={styles}>Theme</h2>
        <Toggle
          onThemeChange={handleThemeChange}
          selectedTheme={selectedTheme}
        />
      </div>
    </div>
  );
};

export default Header;
