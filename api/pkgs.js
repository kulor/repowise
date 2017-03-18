const getSizes = require('package-size');
module.exports = (pkgs) => {
  return getSizes(pkgs, {es6:true})
      // .then(data => {
      //   this.setState({
      //     packageSizes: data
      //   })
        
      //   [
      //     ['vue', '{size}', '{minified size}', '{gzipped size}'],
      //     ['react,react-dom', '{size}', '{minified size}', '{gzipped size}'],
      //     ['preact', '{size}', '{minified size}', '{gzipped size}']
      //   ]
        
      // })
}