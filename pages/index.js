import React from 'react'
import getHomePackages from '../lib/get_home_packages'
import Page from '../components/page'
import PackageList from '../components/package_list'
import request from 'superagent'
import 'isomorphic-fetch'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      packageSizes: [],
      query: '',
      loading: false
    }
  }

  static async getInitialProps () {
    const pkgs = await getHomePackages()
    return { pkgs }
  }

  componentDidMount() {
    // this.fetchResultsForQuery();
  }

  fetchResultsForQuery() {
    
    const res = request.get(`/pkgs/${this.state.query}`)
      .then((res) => {
        // this.state.packageSizes.push(res.body)
        this.setState({
          packageSizes: [res.body],
          loading: false
        })
      })
      .catch((err, b) => {

        this.setState({
          packageSizes: [],
          loading: false,
          error: JSON.parse(err.response.text).error
        })
      })
    // });
  }

  onChangeQuery(e) {
    this.setState({
      query: e.target.value
    })
  }

  search(e) {
    e.preventDefault()
    this.setState({
      packageSizes: [],
      loading:true,
      error: null
    })
    this.fetchResultsForQuery()
  }


  render () {
    return (
      <Page>
        <form className="search" onSubmit={this.search.bind(this)}>
          <input type="search" placeholder="Find a package" onChange={this.onChangeQuery.bind(this)} value={this.state.query} />
        </form>

        {this.state.loading && <div className="loading">Loading...</div>}
        {this.state.error && <div className="error">{this.state.error}</div>}

        <PackageList pkgList={Object.values(this.props.pkgs)} />
      </Page>
    )
  }
}