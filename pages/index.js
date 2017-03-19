import React from 'react'
import Router from 'next/router'
import request from 'superagent';
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
    this.setState({loading:true})
    this.fetchResultsForQuery()
  }


  render () {
    return (
      <div className='app'>
        <form onSubmit={this.search.bind(this)}>
          <input type="search" placeholder="react-dom" onChange={this.onChangeQuery.bind(this)} value={this.state.query} />
        </form>

        <div className='list'>
          {this.state.loading && <div className="loading">Loading...</div>}
          {this.state.error && <div className="error">{this.state.error}</div>}
          <ul>
          {this.state.packageSizes.map((pkg, key)=> {
            return (
              <li key={key}>
                <h3>{pkg.name}</h3>
                <img src={`https://img.shields.io/badge/Package Size-${pkg.fullSize}-green.svg`} />
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
                      <th>{pkg.fullSize}</th>
                      <th>{pkg.minifiedSize}</th>
                      <th>{pkg.minifiedAndGzippedSize}</th>
                    </tr>
                  </tbody>
                </table>
              </li>
            )
          })}
          </ul>
        </div>
      </div>
    )
  }
}