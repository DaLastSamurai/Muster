import firebase from 'firebase'

export const provider = new firebase.auth.GoogleAuthProvider()
// can add scopes as we need them for user data. 
  // .addScope('profile')
  // .addScope('email')

export const OAUTH_KEY = '725434233122-7silvg3edd82c818tqko0o5sjk1tmdtq.apps.googleusercontent.com'
export const HASHED_PASS = 'AYUSAKUIzaSyC4Hi1GpOS3OH33NR4TJeKzZ_8wgLsre0HSEAM1USJNLWCHR3IST6INEbW4U'
