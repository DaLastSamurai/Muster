import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBbnkm3z1j8C5YIljVGLt2-PNaAhOA59h4",
  authDomain: "muster-94d83.firebaseapp.com",
  databaseURL: "https://muster-94d83.firebaseio.com",
  projectId: "muster-94d83",
  storageBucket: "muster-94d83.appspot.com",
  messagingSenderId: "725434233122"
}

firebase.initializeApp(config)

// probably want to put these in seperate files. 
/* ================================ REFS =================================== */
// firebase.database().ref's are analogous to routes in express. They point to
// a specific location in the database. 
// this is the root ref that can be used for manually assigning refs. 
export const rootRef = firebase.database().ref()

// this is the authentication ref ('users' becuase it stores user information)
// to add info to this, do: usersRef.child(`${user.uid}`).set({ /* email: user.email })
export const usersRef = firebase.database().ref("users/") 


/* ============================ Firebase Methods =========================== */
export const firebaseAuth = firebase.auth