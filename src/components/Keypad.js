import React from 'react';
import Key from './Key';
import './Keypad.css';
import * as key_sets from '../data/keys';

const Keypad = ({ onUpdateScreen, theme }) => {
  const RenderKeyRow = ({ keys, row_num, keyHandler, styles }) => {
    return keys.map((key, index) => {
      if (row_num === 1 && index === keys.length - 1) {
        return (
          <Key
            onClick={keyHandler}
            key={index}
            styles={styles.del_reset_}
            text={key.text}
          />
        );
      } else {
        return (
          <Key
            onClick={keyHandler}
            styles={styles.key_main_}
            key={index}
            text={key.text}
          />
        );
      }
    });
  };

  const keyHandler = (key) => {
    onUpdateScreen(key);
  };

  let key_main_style, del_reset_styles, equal_styles;

  switch (theme.theme_id) {
    case 0: {
      key_main_style = {
        backgroundColor: theme.lightKeyBg,
        color: theme.darkText,
        boxShadow: theme.lightKeyShadow,
      };
      del_reset_styles = {
        backgroundColor: theme.darkBlueKeyBg,
        boxShadow: theme.darkBlueKeyShadow,
        color: theme.whiteText,
      };
      equal_styles = {
        backgroundColor: theme.toggleKeyBg,
        boxShadow: theme.toggleKeyShadow,
        color: theme.whiteText,
      };

      break;
    }
    case 1: {
      key_main_style = {
        backgroundColor: theme.lightKeyBg,
        color: theme.darkText,
        boxShadow: theme.lightKeyShadow,
      };
      del_reset_styles = {
        backgroundColor: theme.darkBlueKeyBg,
        boxShadow: theme.darkBlueKeyShadow,
        color: theme.whiteText,
      };
      equal_styles = {
        backgroundColor: theme.toggleKeyBg,
        boxShadow: theme.toggleKeyShadow,
        color: theme.whiteText,
      };

      break;
    }
    case 2: {
      key_main_style = {
        backgroundColor: theme.veryDarkKeyBg,
        color: theme.yellowText,
        boxShadow: theme.veryDarkKeyShadow,
      };
      del_reset_styles = {
        backgroundColor: theme.darkVioletKeyBg,
        boxShadow: theme.darkVioletKeyShadow,
        color: theme.whiteText,
      };
      equal_styles = {
        backgroundColor: theme.toggleKeyBg,
        boxShadow: theme.toggleKeyShadow,
        color: theme.darkText,
      };
      break;
    }
    default:
      break;
  }

  const keypadStyles = {
    backgroundColor: theme.screenBg,
  };

  return (
    <div className="keypad" style={keypadStyles}>
      <div className="keys_row">
        <RenderKeyRow
          keyHandler={keyHandler}
          styles={{ key_main_: key_main_style, del_reset_: del_reset_styles }}
          keys={key_sets.keys_row_1}
          row_num={1}
        />
      </div>
      <div className="keys_row">
        <RenderKeyRow
          keyHandler={keyHandler}
          styles={{ key_main_: key_main_style, del_reset_: del_reset_styles }}
          keys={key_sets.keys_row_2}
          row_num={2}
        />
      </div>
      <div className="keys_row">
        <RenderKeyRow
          keyHandler={keyHandler}
          styles={{ key_main_: key_main_style, del_reset_: del_reset_styles }}
          keys={key_sets.keys_row_3}
          row_num={3}
        />
      </div>
      <div className="keys_row">
        <RenderKeyRow
          keyHandler={keyHandler}
          styles={{ key_main_: key_main_style, del_reset_: del_reset_styles }}
          keys={key_sets.keys_row_4}
          row_num={4}
        />
      </div>
      <div className="keys_row">
        <Key
          onClick={keyHandler}
          styles={del_reset_styles}
          className={'last'}
          text="RESET"
        />
        <Key
          onClick={keyHandler}
          styles={equal_styles}
          className={'last'}
          text="="
        />
      </div>
    </div>
  );
};

export default Keypad;
