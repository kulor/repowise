import React from 'react'
import Router from 'next/router'
import Page from '../components/page'
import Spinner from '../components/spinner'
import Header from '../components/header'
import search from '../lib/search'
import PackageList from '../components/package_list'

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

  componentDidMount () {
    return this.updatePackageResultsFromQuery(this.props)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.url.query.query !== this.props.url.query.query) {
      this.updatePackageResultsFromQuery(nextProps)
    }
  }

  onChangeQuery (query) {
    this.setState({
      query: query
    })
  }

  updatePackageResultsFromQuery (nextProps) {
    this.setState({
      loading: true,
      error: null,
      pkgs: []
    })

    search(nextProps.url.query.query, (err, content) => {
      if (err) {
        return this.setState({
          error: err.message,
          loading: false
        })
      }

      this.setState({
        pkgs: content.hits,
        loading: false
      })
    })
  }

  onSubmitSearch () {
    // Search happens by observing the props.query change to ensure url persistence is kept in sync
    Router.push({
      pathname: '/',
      query: { query: this.state.query }
    })
  }

  render () {
    return (
      <Page>
        <Header {...this.props} />

        {this.state.loading
          ? <div style={{padding: '20px'}}><Spinner /></div>
          : <PackageList pkgList={this.state.pkgs} />
        }
      </Page>
    )
  }
}
