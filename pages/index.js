import React from 'react'
import Router from 'next/router'
import request from 'superagent'
import Head from 'next/head'
import Package from '../components/package'
import 'isomorphic-fetch'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      packageSizes: [],
      query: 'jquery',
      loading: true
    }
  }

  componentDidMount() {
    this.fetchResultsForQuery();
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
      <div className='app'>
        <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width" />
          <title>Package Size</title>
          <style>{`
          body {
            background: #2a3351;
            padding-top: 65px;
            color: #fff;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
          }

          .search {
            background: #2a3351;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
          }

          .search input {
            background: transparent;
            padding: 20px;
            font-size: 26px;
            font-weight: 300;
            color: #fff;
            display: block;
            width: 100%;
            border: none;
            border-bottom: 1px solid rgba(233, 30, 99, 0.5);
            border-radius: 0;
            transition: border 180ms ease-in-out;
            -webkit-appearance: none;
            -webkit-border-radius:0px;
          }

          .search input:focus {
            outline: none;
            border-color: rgba(233, 30, 99, 1); 
          }


          .app {
            max-width: 600px;
            margin: 0 auto;
            margin-top: 20px;
            position: relative;
            padding: 10px;
          }

          table {
            border: 1px solid #ccc;
            border-radius: 3px;
            width: 100%;
          }

          td, th {
            font-weight: 400;
            padding: 4px;
          }

          thead th {
            border-bottom: 1px solid #ccc;
          }
          ul, ul li {
            list-style: none;
            margin:0;
            padding:0;
          }

        `}</style>
        </Head>

        <form className="search" onSubmit={this.search.bind(this)}>
          <input type="search" placeholder="Find a package" onChange={this.onChangeQuery.bind(this)} value={this.state.query} />
        </form>

        <div className='list'>
          {this.state.loading && <div className="loading">Loading...</div>}
          {this.state.error && <div className="error">{this.state.error}</div>}
          <ul>
          {this.state.packageSizes.map((pkg, key)=> {
            return (
              <li key={key}>
                <Package pkg={pkg} />
              </li>
            )
          })}
          </ul>
        </div>
      </div>
    )
  }
}