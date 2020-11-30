import * as firebase from "firebase";

// use react-native-dotenv
const firebaseConfig = {
  apiKey: "AIzaSyDWFW9QsL_vRHA8co79EouC7nBKDt1FzaU",
  authDomain: "genshin-app-a8a7b.firebaseapp.com",
  databaseURL: "https://genshin-app-a8a7b.firebaseio.com",
  projectId: "genshin-app-a8a7b",
  storageBucket: "genshin-app-a8a7b.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};
firebase.initializeApp(firebaseConfig);
