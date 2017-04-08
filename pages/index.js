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
      pkgs: props.pkgs && Object.values(props.pkgs) || [],
      loading: true
    }
  }

  componentDidMount() {
    this.getPackageResultsForHome();
  }


  async getInitialProps () {
    // if(!this.props.url.query.query) {
    //   const pkgs = await getHomePackages()
    //   return { pkgs }
    // }
    return {};
  }

  getPackageResultsForHome() {
    var ref = db.ref().child('search');
    var key = ref.child('request').push(
      {
        type:'package',
        index:'packages2',
        size: 50,
        body: {
          "query": {
            "constant_score" : {
                "filter" : {
                    "terms" : {
                        "name" : ["react","jquery", "angular", "ember","twitter-bootstrap"]
                    }
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
