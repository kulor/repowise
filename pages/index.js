import React from 'react'
import Router from 'next/router'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pagageSizes: []
    }
  }

  getInitialProps() {
    // import getSizes from 'package-size';
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

        
      </div>
    )
  }
}