const getSizes = require('package-size');
const Cache = require('stale-lru-cache');
var Promise = require('promise');


const cache = new Cache({
    maxSize: 1000,
    maxAge: 1200,
    staleWhileRevalidate: 86400
});

module.exports = (pkgs) => {
  return getSizes([pkgs], {es6:true})
}