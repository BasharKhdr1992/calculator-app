import React from 'react';
import Themes from '../data/themes';
import './Toggle.css';

const Toggle = ({ selectedTheme, onThemeChange }) => {
  const theme = Themes[selectedTheme];

  let textColor;

  switch (theme.theme_id) {
    case 0:
      textColor = theme.whiteText;
      break;
    case 1:
      textColor = theme.darkTex;
      break;
    case 2:
      textColor = theme.yellowText;
      break;
    default:
      break;
  }

  return (
    <div>
      <div className="title-container" role="main">
        <div className="title" style={{ color: textColor }}>
          1
        </div>
        <div className="title" style={{ color: textColor }}>
          2
        </div>
        <div className="title" style={{ color: textColor }}>
          3
        </div>
      </div>
      <div
        onClick={onThemeChange}
        style={{ backgroundColor: theme.toggleKeypadBg }}
        className="toggle-container"
      >
        {Themes.map((theme) => {
          const styles =
            theme.theme_id === selectedTheme
              ? {
                  backgroundColor: theme.toggleKeyBg,
                  boxShadow: theme.toggleKeyShadow,
                }
              : { visibility: 'hidden' };

          return (
            <div
              key={theme.theme_id}
              className="toggle-btn"
              style={styles}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Toggle;
