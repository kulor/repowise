import React from 'react'
import Router from 'next/router'
import Page from '../components/page'
import Spinner from '../components/spinner'
import Header from '../components/header'
import Search from '../components/search'
import PackageList from '../components/package_list'
import algoliasearch from 'algoliasearch'
const client = algoliasearch('LGDJZ6PHE2', '31f0cc1c00b9dc3c666a25f560448e31')
const index = client.initIndex('packages4')

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      packageSizes: [],
      query: props.url.query.query || '',
      pkgs: props.pkgs && Object.values(props.pkgs) || [],
      loading: true
    }
  }

  componentDidMount() {
    return this.updatePackageResultsFromQuery(this.props)
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.url.query.query !== this.props.url.query.query) {
      this.updatePackageResultsFromQuery(nextProps)
    }
  }

  onChangeQuery(query) {
    this.setState({
      query: query
    })
  }

  updatePackageResultsFromQuery(nextProps) {
    this.setState({
      loading: true,
      error: null,
      pkgs: []
    })

    index.search(nextProps.url.query.query, (err, content) => {
      this.setState({
        pkgs: content.hits,
        loading: false
      })
    })
  }

  onSubmitSearch() {
    // Search happens by observing the props.query change to ensure url persistence is kept in sync
    Router.push({
      pathname: '/',
      query: { query: this.state.query }
    })
  }

  getPackageList() {
    const packages = Object.values(this.props.pkgs)
    return packages
    const filteredPackages = packages.filter(pkg => {
      return pkg.name.toLowerCase().search(this.state.query.toLowerCase()) >= 0
    })
    return filteredPackages
  }


  render () {
    return (
      <Page>
        <Header {...this.props} />

        {this.state.error && <div className="error">{this.state.error}</div>}

        {this.state.loading
          ? <div style={{padding: '20px'}}><Spinner /></div>
          : <PackageList pkgList={this.state.pkgs} />
        }

        <style>{`
            .error {
              text-align: center;
              font-weight: bold;
              color: #cbc6de;
              font-size: 20px;
            }
        `}</style>
      </Page>
    )
  }
}
