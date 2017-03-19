const getSizes = require('package-size');
const Cache = require('stale-lru-cache');
var Promise = require('promise');


const cache = new Cache({
    maxSize: 1000,
    maxAge: 1200,
    staleWhileRevalidate: 86400
    // revalidate: function (key, callback) {
    //   return getSizes([key], {es6:true}).then((data) => {
    //     cache.set(key, data);
    //   })
    // }
});

module.exports = (pkgs) => {
  const revalidate = function (key, callback) {
    return getSizes([key], {es6:true})
      .then((res) => {
        const data = res[0]
        const structuredData = {
          name: data[0],
          fullSize: data[1],
          minifiedSize: data[2],
          minifiedAndGzippedSize: data[3]
        }
        callback(null, structuredData)
      })
      .catch((e) => {
        callback(e.message, null)
      })
  }

  var promise = new Promise(function (resolve, reject) {
    cache.wrap(pkgs, revalidate, (err, res) => {
      if(err) {
        return reject(err);
      }
      return resolve(res);
    });
  });

  return promise;
}
  // return getSizes(pkgs, {es6:true})
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
// }