/**
 * 2018-09-15
 */

import { Component } from 'react'

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
    return { name, subname }
  }

  render() {
    const { data } = this.state
    let listContent = data.map((item, index) => {
      
    })

    return (
      <div>
        <h2>子名称{this.props.subname}</h2>
        <p>频道页{this.props.name}</p>
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