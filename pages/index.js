import React from 'react'
import Router from 'next/router'
import 'isomorphic-fetch'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      packageSizes: []
    }
  }

  static async getInitialProps(props) {
    const pkgs = props.req.query.pkgs || ['react','react-dom', 'preact', 'jquery'].join(',')
    const res = await fetch(`http://${props.req.headers.host}/pkgs/${pkgs}`)
    const data = await res.json();
    return { packageSizes: data }

     // return request
     //   .get('/pkgs/react,preact')
     //   .set('Accept', 'application/json')
     //   .end(function(err, res){
     //     if (err || !res.ok) {
     //       // TODO
     //     } else {
     //      this.setState({
     //        packageSizes: res.body
     //      })
     //      alert('yay got ' + JSON.stringify(res.body));
     //     }
     //   });
  }

  componentDidMount() {
    // getSizes(['react,react-dom'], options)
    //   .then(data => {
    //     this.setState({
    //       packageSizes: data
    //     })
        
    //     [
    //       ['vue', '{size}', '{minified size}', '{gzipped size}'],
    //       ['react,react-dom', '{size}', '{minified size}', '{gzipped size}'],
    //       ['preact', '{size}', '{minified size}', '{gzipped size}']
    //     ]
        
    //   })
    //   {this.state.pagageSizes.map((pkg, key)=> {
    //       return (
    //         <div key={key}>
    //         {pkg[0]} - {pkg[1]}
    //         </div>
    //       )
    //     })}


  }


  render () {
    // const { url, photos } = this.props

    return (
      <div className='list'>
        <ul>
        {this.props.packageSizes.map((pkg, key)=> {
          return (
            <li key={key}>
              <h3>{pkg[0]}</h3>
              <img src={`https://img.shields.io/badge/${pkg[0]}-${pkg[2]}-green.svg`} />
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
                    <th>{pkg[1]}</th>
                    <th>{pkg[2]}</th>
                    <th>{pkg[3]}</th>
                  </tr>
                </tbody>
              </table>
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}