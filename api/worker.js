var Queue = require('firebase-queue');
var admin = require('firebase-admin');
const pkgsApi = require('./pkgs')

var serviceAccount = require('./firebase_credentials.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://packagemass-2e344.firebaseio.com'
});

var ref = admin.database().ref('queue');
var packagesRef = admin.database().ref('packages');
var queue = new Queue(ref, function(meta, progress, resolve, reject) {
  // Read and process task data
  // console.log(data);

  // Do some work
  progress(50);

  pkgsApi(meta.package)
      .then((res) => {
        // res.send(data);
        // console.log('data', data)
        const data = res[0]
        const structuredData = {
          name: data[0],
          fullSize: data[1],
          minifiedSize: data[2],
          minifiedAndGzippedSize: data[3]
        }

        packagesRef.child(structuredData.name).set(structuredData);
        resolve(structuredData);
      })
      .catch((err) => {
        console.log('catch', err)
        reject(err.message)
      })
});