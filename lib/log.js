const chalk = require('chalk')

const log = console.log

// 提示
const hint = (...info) => {
  log(chalk.blue(info))
}

// 错误
const error = (...info) => {
  log(chalk.blue(info))
}

// 清空
const clear = () => {
  console.clear()
}

module.exports = {
  hint,
  error,
  clear
}