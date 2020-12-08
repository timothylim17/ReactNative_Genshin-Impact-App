import React from "react";
import * as firebase from 'firebase';
import { firebaseConfig } from 'genshin-impact-app/App/modules/utils';
import { ApolloProvider } from '@apollo/react-hooks';
import { AuthProvider, Routes } from 'genshin-impact-app/App/modules/navigation';


import { client } from 'genshin-impact-app/App/graphql/client';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ApolloProvider>
  );
}