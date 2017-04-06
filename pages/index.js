import React from 'react'
import getHomePackages from '../lib/get_home_packages'
import Page from '../components/page'
import Header from '../components/header'
import Search from '../components/search'
import PackageList from '../components/package_list'
import request from 'superagent'
import 'isomorphic-fetch'

import db from '../lib/db'



export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      packageSizes: [],
      query: props.url.query.query || '',
      pkgs: Object.values(props.pkgs) || [],
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
    }, this.doSearch)
  }

  doSearch() {
    var ref = db.ref().child('search');
    var key = ref.child('request').push(
      {
        type:'package',
        index:'packages2',
        size: 50,
        // q: this.state.query,
        body: {
          query: {
            "match_phrase": {
              // this is the field name, _all is a meta indicating any field
              "name": this.state.query
            }
          }
        }
      }
    ).key;

    this.setState({
      loading: true,
      pkgs: [],
      error: null
    })

    ref.child('response/'+key).on('value', (snap) => {
      if( !snap.exists() ) { return; } // wait until we get data
      var dat = snap.val().hits;
      console.log(dat)
      if(dat.total === 0) {
        return this.setState({
          error: "Sorry, no results were found",
          loading: false
        });
      }
      this.setState({
        pkgs: dat.hits.map((res) => res._source),
        loading: false
      })
    });
  }

  getPackageList() {

    const packages = Object.values(this.props.pkgs)
    return packages;
    const filteredPackages = packages.filter(pkg => {
      return pkg.name.toLowerCase().search(this.state.query.toLowerCase()) >= 0;
    })
    return filteredPackages
  }


  render () {
    return (
      <Page>
        <Header>
          <Search
            value={this.state.query}
            onChange={this.onChangeQuery.bind(this)}
            onSubmit={this.doSearch.bind(this)} />
        </Header>


        {this.state.error && <div className="error">{this.state.error}</div>}

        {this.state.loading
          ? <div className="loading">Loading...</div>
          : <PackageList pkgList={this.state.pkgs} />
        }

        <div className="intro">
          Be aware of the size of javascript libraries you depend on.
        </div>
        <style jsx>{`
            .intro {
              font-size: 24px;
              font-weight: 400;
              padding: 20vh 0;
            }
        `}</style>
      </Page>
    )
  }
}
