import React from 'react'
import Router from 'next/router'
import getHomePackages from '../lib/get_home_packages'
import Page from '../components/page'
import Spinner from '../components/spinner'
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
      pkgs: props.pkgs && Object.values(props.pkgs) || [],
      loading: true
    }
  }

  componentDidMount() {
    if(this.props.url.query.query){
      return this.updatePackageResultsFromQuery(this.props);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.url.query.query !== this.props.url.query.query) {
      console.log('query changed', nextProps.url.query.query);
      this.updatePackageResultsFromQuery(nextProps);
    }
  }

  onChangeQuery(query) {
    this.setState({
      query: query
    })
  }

  updatePackageResultsFromQuery(nextProps) {
    var ref = db.ref().child('search');
    var key = ref.child('request').push(
      {
        type:'package',
        index:'packages3',
        size: 50,
        body: {
          query: {
            "fuzzy": {
              "name": {
                "value": nextProps.url.query.query.toLowerCase(),
                "fuzziness": 1,
                "prefix_length" : 1
              }
            }
          }
        }
      }
    ).key;

    this.setState({
      loading: true,
      error: null,
      pkgs: []
    })

    ref.child('response/'+key).on('value', (snap) => {
      if( !snap.exists() ) { return; } // wait until we get data
      var dat = snap.val().hits;
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

  onSubmitSearch() {
    // Search happens by observing the props.query change to ensure url persistence is kept in sync
    Router.push({
      pathname: '/',
      query: { query: this.state.query }
    })
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
