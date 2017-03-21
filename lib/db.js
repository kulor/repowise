import firebase from 'firebase'

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

const root = firebase
  .database()
  .ref('packages')

export default root