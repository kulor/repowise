import React from 'react'
import getPackage from '../lib/get_package'
import Header from '../components/header'
import Page from '../components/page'
import Package from '../components/package'
import Link from 'next/link'

export default class extends React.Component {

  static async getInitialProps ({ req, query: { id } }) {
    const pkg = await getPackage(id)
    return { pkg }
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { pkg } = this.props
    return <Page>
              <Header />
              <Package pkg={pkg} />
            </Page>
  }

  componentDidMount () {}

}
