import React from 'react'
import getHomePackages from '../lib/get_home_packages'
import Page from '../components/page'
import Header from '../components/header'
import Search from '../components/search'
import PackageList from '../components/package_list'
import request from 'superagent'
import 'isomorphic-fetch'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      packageSizes: [],
      query: props.url.query.query || '',
      loading: false
    }
  }

  static async getInitialProps () {
    const pkgs = await getHomePackages()
    return { pkgs }
  }

  onChangeQuery(query) {
    this.setState({
      query: query
    })
  }

  getPackageList() {
    const packages = Object.values(this.props.pkgs)
    const filteredPackages = packages.filter(pkg => {
      return pkg.name.toLowerCase().search(this.state.query.toLowerCase()) >= 0;
    })
    return filteredPackages
  }


  render () {
    return (
      <Page>
        <Header>
          <Search value={this.state.query} onChange={this.onChangeQuery.bind(this)} />
        </Header>

        {this.state.loading && <div className="loading">Loading...</div>}
        {this.state.error && <div className="error">{this.state.error}</div>}

        <PackageList pkgList={this.getPackageList()} />
      </Page>
    )
  }
}
