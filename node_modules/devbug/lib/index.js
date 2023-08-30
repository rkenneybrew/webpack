const chalk = require('chalk');
const fs = require('fs');
const beautify = require('json-beautify');


const colors = {
  RED: 'red',
  GREEN: 'green',
  YELLOW: 'yellow',
  BLUE: 'blue',
  GRAY: 'gray',
  PURPLE: 'magenta',
  CYAN: 'cyan',
  WHITE: 'white',
};


const _forceDebugMode = { value: false };

let _numberOrder = 0;

const getNumberOrder = () => {
  _numberOrder += 1;
  return _numberOrder;
};


const _debugmode = () => {
  if (_forceDebugMode.value) {
    return true;
  } else if (fs.existsSync('./package.json')) {
    return require('../../../package.json').debugmode;
  }

  return false;

};


const _echoOutput = (description, valueToOutput, color) => {
  const char = '-';
  const desc = `---------- ${getNumberOrder()}. ${description} (length: ${valueToOutput.length}) ----------`;
  console.log(chalk.keyword(color)(desc));

  let output = valueToOutput;

  if (typeof valueToOutput === 'object') {
    output = beautify(valueToOutput, null, 2, 80);
  }

  console.log(chalk.keyword(color)(output));

  console.log(chalk.keyword(color)(char.repeat(desc.length)));
  console.log('\n');
};

const msg = (description, valueToOutput, color = colors.GREEN) => {
  if (typeof valueToOutput !== 'undefined') {
    _echoOutput(description, valueToOutput, color);
  }
};


const dbg = (description, valueToOutput, color = colors.WHITE) => {
  if (typeof valueToOutput !== 'undefined' && _debugmode() === true) {
    _echoOutput(description, valueToOutput, color);
  }
};


module.exports = {
  _forceDebugMode,
  dbg,
  msg,
  colors,
};
