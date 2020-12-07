import React, { useState, createContext } from 'react';
import * as firebase from 'firebase';

// import { AuthContext } from 'genshin-impact-app/App/modules/utils'; 

/**
 * This provider allows
 * users to have access
 */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn: async (email, password) => {
          // firebase
          //   .auth()
          //   .signInWithEmailAndPassword(email, password)
          //   .then(result => {
          //     console.log('signIn result: ', result);
          //   })
          //   .catch(e => {
          //     console.log('sign in failed: ', e);
          //   });
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.error('sign in failed: ', e);
          }
        },
        signUp: async (email, password) => {
          // firebase
          //   .auth()
          //   .createUserWithEmailAndPassword(email, password)
          //   .then(result => {
          //     console.log('signUp result: ', result);
          //   })
          //   .catch(e => {
          //     console.log('signUp failed: ', e);
          //   });
           try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.error('sign up failed: ', e);
          }
        }, 
        signOut: async() => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.error('logout failed: ', e)
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};