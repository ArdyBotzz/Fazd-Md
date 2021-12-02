const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const FazdLog = (text, color) => {
	return !color ? chalk.cyan('[Fazd] ') + chalk.yellow(text) : chalk.cyan('[Fazd] ') + chalk.keyword(color)(text)
}

module.exports = {
  color,
  FazdLog
}
