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
import md5 from 'md5'
import {packages2} from '../lib/db'

const featuredPackages = [
  'react',
  'lodash.js',
  'twitter-bootstrap',
  'jquery',
  'vue',
  'moment.js'
]

const getPackagesForHome = () => {
  var ref = packages2
  var promises = []
  featuredPackages.forEach(pkg => {
    const promise = new Promise((resolve, reject) => {
      packages2.child(md5(pkg))
        .once('value', (snap) => {
          if(snap.val() !== null) {
            return resolve(snap.val())
          }
          reject()
        })
    })
    promises.push(promise)
  })

  return Promise.all(promises)
}

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      packageSizes: [],
      pkgs: props.pkgs && Object.values(props.pkgs) || [],
      loading: false
    }
  }

  static async getInitialProps (props) {
    const pkgs = await getPackagesForHome()
    return { ...this.props, pkgs }
  }

  render () {
    return (
      <Page>
        <Header {...this.props} />

        {this.state.error && <div className="error">{this.state.error}</div>}

        {this.state.loading
          ? <div style={{padding: '20px'}}><Spinner /></div>
          : <PackageList pkgList={this.props.pkgs} />
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
