const path = require('path')
const fs = require('fs')

const configPath = path.resolve(__dirname, 'config.json')

// If config file does not exist, create it and fill with sample config content
if (!fs.existsSync(configPath)) {
  fs.copyFileSync(`${configPath}.sample`, configPath, err => {
    if (err) throw new Error(err)
  })
}

module.exports = require(configPath)
