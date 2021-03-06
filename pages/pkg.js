import React from 'react'
import getPackage from '../lib/get_package'
import Header from '../components/header'
import Page from '../components/page'
import Package from '../components/package'

export default class extends React.Component {
  static async getInitialProps ({ req, query: { id } }) {
    const pkg = await getPackage(id)
    return { pkg }
  }

  render () {
    const { pkg } = this.props
    return (
      <Page>
        <Header {...this.props} />
        <Package pkg={pkg} withVersions />
      </Page>
    )
  }
}
