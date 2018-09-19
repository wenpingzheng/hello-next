/**
 * @author wpzheng
 * @time 2018-09-15
 * @param {string} props.name - 名称
 * @param {string} props.subname - 分类
 * @param {Object} props.apiData - 数据
 */

import { Component } from 'react'
import jsonp from '../libs/isomorphic-jsonp'

/**
 * 获取数据函数
 */
let loadVieosList = () => {
  return jsonp('https://pacaio.match.qq.com/xw/rcdVideo', {
    t: new Date().getTime()
  })
}

/**
 * 主体函数开始
 */
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      subname: '',
      data: ['列表一', '列表二', '列表三', '列表四'],
    }
  }

  static async getInitialProps({ query }) {
    const name = query.name
    const subname = query.subname
    const data = await loadVieosList()
    const apiData = data.data
    return { name, subname, apiData}
  }

  render() {
    const { name, subname, apiData } = this.props
    console.log(apiData)
    /*
    let listContent = data.map((item, index) => {
      
    })*/

    return (
      <div>
        <h2>子名称{subname}</h2>
        <p>频道页{name}</p>
        <style jsx>{`
          p{
            font-size:24px;
            font-weight:800;
            color:red;
          }
        `}</style>
      </div>
    )
  }
}