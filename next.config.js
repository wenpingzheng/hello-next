
/**
 * process.env.NODE_ENV - 默认
 * @ yarn dev - development 
 * @ yarn build - production
 */

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  exportPathMap: () => {
    return {
      '/': { page: '/', query: { static: true } },
      '/m/news' : { page: '/channel', query: { static: true, name: 'news'}},
      '/m/video/group' : { page: '/video', query: { static: true, name: 'video', subname: 'group'}}
    }
  },
  assetPrefix: isProd ? 'https://mat1.gtimg.com/pingjs/ext2020/xw-next/' : ''
}