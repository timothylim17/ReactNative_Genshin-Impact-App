import React from "react";
import * as firebase from 'firebase';
import { firebaseConfig } from 'genshin-impact-app/App/modules/utils';
import { AuthProvider, Routes } from 'genshin-impact-app/App/modules/navigation';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
