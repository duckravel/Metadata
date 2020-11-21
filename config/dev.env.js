'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // APIGET:'"http://localhost:3000/restful/user"',
  // APIDATA:'"http://localhost:3000/restful/data"',
  APIGET:'"https://safe-badlands-68606.herokuapp.com/restful/user"',
  APIDATA:'"https://safe-badlands-68606.herokuapp.com/restful/data"',
})
