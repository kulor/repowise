import React from 'react'
import Router from 'next/router'
import request from 'superagent'
import Head from 'next/head'
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




          .card {
            background: #fff;
            border-radius: 5px;
            color: #2f395a;
            position: relative;
            overflow: hidden;
            padding: 20px;
          }

          @media (min-width: 400px) {
            .card {
              padding: 30px;
            }
          }

          @media (min-width: 400px) {
            .card-stat-icon {
              position: absolute;
              right: 30px;
              top: 35px;
            }
          }

          .card table {
            border: none;
            font-size: 13px;
            text-align: left;
            border-collapse: collapse;
            margin: 10px 0;
          }

          .card table th,
          .card table td {
            padding: 2px 5px;
          }

          @media (min-width: 400px) {
            .card table th,
            .card table td {
              padding: 2px 10px;
            }
          }

          .card table th {
            width: 33.333%;
            color: #9c5479;
            font-weight: normal;
            font-size: 12px;
            border-bottom: none;
            vertical-align: bottom;
          }

          .card th:first-child,
          .card td:first-child {
            padding-left:0;
          }

          .card th:last-child,
          .card td:last-child {
            padding-right:0;
          }

          @media (min-width: 400px) {
            .card table th {
              font-size: 15px;
            }
          }

          .card table td {
            font-size: 20px;
          }

          @media (min-width: 400px) {
            .card table td {
              font-size: 26px;
            }
          }

          @media (min-width: 400px) {
            .card table {
              font-size: 18px;
            }
          }

          .card h3 {
            padding: 0;
            margin: 0;
            font-size: 25px;
            margin-bottom: 20px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.07);
            padding-bottom: 20px;
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
                <div className="card">
                  <h3>{pkg.name}</h3>
                  <img className="card-stat-icon" src={`https://img.shields.io/badge/Package Size-${pkg.fullSize}-green.svg`} />
                  <table>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Minified</th>
                        <th>Minified + Gzipped</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>{pkg.fullSize}</strong></td>
                        <td>{pkg.minifiedSize}</td>
                        <td>{pkg.minifiedAndGzippedSize}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            )
          })}
          </ul>
        </div>
      </div>
    )
  }
}