import React, { useState, createContext } from "react";
import * as firebase from "firebase";

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
          // sign in firebase and set displayName
          try {
            await firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(({ user }) => {
                // get the display name and email from object
                let { displayName, email } = user;

                // displayName is split from the @
                displayName = email.split("@")[0];

                // update user profile
                user.updateProfile({ displayName });
              });
          } catch (e) {
            console.error("sign in failed: ", e);
          }
        },
        signUp: async (email, password) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(({ user }) => {
                // get the display name and email from object
                let { displayName, email } = user;

                // displayName is split from the @
                displayName = email.split("@")[0];

                // update user profile
                user.updateProfile({ displayName });
              });
          } catch (e) {
            console.error("sign up failed: ", e);
          }
        },
        signOut: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.error("logout failed: ", e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
