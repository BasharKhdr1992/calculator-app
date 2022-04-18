import React, { useState } from 'react';
import Header from './components/Header';
import Screen from './components/Screen';
import './App.css';
import Keypad from './components/Keypad';
import Themes from './data/themes';

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(0);

  const [result, setResult] = useState('0');

  const getIntermediateResult = (l, r, expression) => {
    switch (expression) {
      case '+':
        return l + r;
      case '-':
        return l - r;
      case 'x':
        return l * r;
      case '/':
        return l / r;
      default:
        return l;
    }
  };

  const evaluateExpression = (result) => {
    const numbers = result.split(/[+|\-|x|/]/g);
    const operators = result.split(/\d+|\.\d+/g).filter((op) => op !== '');
    let acc = +numbers[0];
    let exp_index = 0;
    let r;

    for (let i = 1; i < numbers.length; i++) {
      r = +numbers[i];
      acc = getIntermediateResult(acc, r, operators[exp_index]);
      exp_index++;
    }

    return acc;
  };

  const handleScreenUpdate = (key) => {
    switch (key.toLowerCase()) {
      case '=': {
        let evaluatedExpression;
        if (isNaN(result[result.length - 1])) {
          evaluatedExpression = evaluateExpression(
            result.substring(0, result.length - 1)
          );
        } else {
          evaluatedExpression = evaluateExpression(result);
        }
        setResult(evaluatedExpression.toString());
        break;
      }

      case 'del': {
        setResult((prev) =>
          prev !== '0' ? prev.substring(0, prev.length - 1) : '0'
        );
        break;
      }

      case 'reset': {
        setResult('0');
        break;
      }

      case '.': {
        setResult((prev) => `${prev}${key}`);
        break;
      }

      default: {
        setResult((prev) => {
          if (isNaN(prev[prev.length - 1]) && isNaN(key)) {
            return prev;
          } else {
            return `${prev}${key}`;
          }
        });
        break;
      }
    }
  };

  const handleThemeChange = () =>
    setSelectedTheme((prev) => {
      return (prev + 1) % Themes.length;
    });
  const theme = Themes[selectedTheme];

  return (
    <div className="main" role="main" style={{ backgroundColor: theme.mainBg }}>
      <Header
        theme={theme}
        selectedTheme={selectedTheme}
        handleThemeChange={handleThemeChange}
      />
      <Screen result={result} theme={theme} />
      <Keypad theme={theme} onUpdateScreen={handleScreenUpdate} />
    </div>
  );
};

export default App;
