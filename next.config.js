
/**
 * process.env.NODE_ENV - 默认
 * @ yarn dev - development 
 * @ yarn build - production
 */

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  exportPathMap: () => {
    return {
      '/': { page: '/', query: { static: true } }
    }
  },
  assetPrefix: isProd ? 'https://mat1.gtimg.com/pingjs/ext2020/xw-next/' : ''
}