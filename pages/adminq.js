import React from 'react'
import {queueDb} from '../lib/db'
import Page from '../components/page'
import Package from '../components/package'

export default class extends React.Component {

  static async getInitialProps ({ req }) {
    const queue = await queueDb.once('value').val()
    return { queue }
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    console.log(this.props)
    return <div />
  }

  componentDidMount () {}
}