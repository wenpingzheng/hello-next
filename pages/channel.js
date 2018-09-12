/**
 * 2018-3-16
 */

import { Component } from 'react'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      data: [],
      subname: ''
    }
  }

  static async getInitialProps({ query }) {
    const name = query.name
    const subname = query.subname
    return { name, subname }
  }

  render() {
    return (
      <div>
        <p>频道页{this.props.name}</p>
        <style jsx>{`
          p{
            font-size:24px;
            font-weight:800;
          }
        `}</style>
      </div>
    )
  }
}