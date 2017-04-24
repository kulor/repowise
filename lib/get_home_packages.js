import md5 from 'md5'
import {packagesRef} from './firebase'

const featuredPackages = [
  'react',
  'lodash.js',
  'twitter-bootstrap',
  'jquery',
  'vue',
  'moment.js'
]

const getHomePackages = () => {
  var promises = []
  featuredPackages.forEach(pkg => {
    const promise = new Promise((resolve, reject) => {
      packagesRef.child(md5(pkg))
        .once('value', (snap) => {
          if (snap.val() !== null) {
            return resolve(snap.val())
          }
          reject()
        })
    })
    promises.push(promise)
  })

  return Promise.all(promises)
}

export default getHomePackages
