
const webpack = require('webpack');


module.exports = {
  exportPathMap: () => {
    return {
      '/': { page: '/', query: { static: true } }
    }
  }
} 