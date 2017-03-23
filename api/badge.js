const badge = require('gh-badges');
const firebase = require('firebase');
var filesizeParser = require('filesize-parser');

try {
  firebase.initializeApp({
    databaseURL: 'https://packagemass-2e344.firebaseio.com'
  })
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

const db = firebase
  .database()
  .ref('packages')


getColourForSize = (size) => {
  const bytes = filesizeParser(size.toUpperCase());
  if(bytes >= 512000) return 'red';
  if(bytes >= 262144) return 'orange';
  if(bytes >= 131072) return 'yellow';
  if(bytes >= 65536) return 'green';
  return 'brightgreen';
}

module.exports = (name, callback) => {
  db.child(name)
    .once('value')
    .then((pkg) => {
      const val = pkg.val();
      if(!val) {
        return callback(null, new Error("Package not found"));
      }

      return badge(
        {
          text: ["Package Size", val.fullSize],
          colorscheme: getColourForSize(val.fullSize),
          template: "flat"
        },
        callback
      );
    })
    .catch((e) => {
      callback(null, e);
    })
  
}