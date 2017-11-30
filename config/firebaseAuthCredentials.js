import firebase from 'firebase'

export const provider = new firebase.auth.GoogleAuthProvider()
// can add scopes as we need them for user data. 
  // .addScope('profile')
  // .addScope('email')
