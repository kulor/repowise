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
    console.log(props.req.headers.host)
    const res = await fetch(`http://${props.req.headers.host}/pkgs/react,preact`)
    const data = await res.json();
    console.log(data)
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
        Hello world lol!

        {this.props.packageSizes.map((pkg, key)=> {
          return (
            <div key={key}>
            <img src={`https://img.shields.io/badge/${pkg[0]}-${pkg[1]}-green.svg`} />
            {pkg[0]} - {pkg[1]}
            </div>
          )
        })}
      </div>
    )
  }
}