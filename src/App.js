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
        return l / parseFloat(r);
      default:
        return l;
    }
  };

  const joinOperatorsAndNumbers = (numbers, operators) => {
    let exp_index = 0;
    let operationsAr = [];

    for (let i = 0; i < numbers.length - 1; i++) {
      operationsAr = [
        ...operationsAr,
        { l: numbers[i], r: numbers[i + 1], operator: operators[exp_index] },
      ];
      exp_index++;
    }

    return operationsAr;
  };

  const splitExpression = (exp) => {
    let numbers = exp.split(/[+|\-|x|/]/g);
    let operators = exp.split(/\d+|\.\d+/g).filter((op) => op !== '');

    return { numbers, operators };
  };

  const evaluateExpression = (result) => {
    let { numbers, operators } = splitExpression(result);

    let operationsAr = joinOperatorsAndNumbers(numbers, operators);

    for (let i = 0; i < operationsAr.length; i++) {
      let el = operationsAr[i];
      let temp;

      if (el.operator === 'x' || el.operator === '/') {
        temp = getIntermediateResult(+el.l, +el.r, el.operator);
        if (i > 0) {
          operationsAr[i - 1].r = temp.toString();
        }
        if (i < operationsAr.length - 1) {
          operationsAr[i + 1].l = temp.toString();
        }
      }
    }

    operationsAr = operationsAr.filter(
      (el) => el.operator === '+' || el.operator === '-'
    );

    let acc = getIntermediateResult(
      +operationsAr[0].l,
      +operationsAr[0].r,
      operationsAr[0].operator
    );
    for (let i = 1; i < operationsAr.length; i++) {
      acc = getIntermediateResult(
        acc,
        +operationsAr[i].r,
        operationsAr[i].operator
      );
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
    <div
      className="wrapper"
      role="main"
      style={{ backgroundColor: theme.mainBg }}
    >
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
