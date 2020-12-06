import React, { useEffect, createContext, useReducer, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from 'firebase';

import { Initializing } from 'genshin-impact-app/App/modules/screens';
import { firebaseConfig, getUserData, storeUserData, removeUserData } from 'genshin-impact-app/App/modules/utils';
import { MainStack, AuthStack } from 'genshin-impact-app/App/modules/navigation';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {

  const AuthContext = createContext({});

  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null
        };
    }
  },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
        
      try {
        // find token
        userToken = getUserData();
        console.log('token found? ', userToken);
      } catch (e) {
        // token failed
        console.log('token failed: ', e);
      }
    
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  // Persisting user data
  const authContext = useMemo(() => ({
    signIn: async data => {
      // send data to the server
      // after getting token, persist token using AsyncStorage
      console.log('signIn authContext: ', data);

      dispatch({ type: 'SIGN_IN', token: storeUserData(data)})
    },
    signOut: () => {
      // sign user out and remove token
      removeUserData();
      dispatch({ type: 'SIGN_OUT' });
    },
    createAccount: async data => {
      // send data to the server
      // after getting token, persist token using AsyncStorage
      console.log('createAccount authContext: ', data);


      dispatch({ type: 'SIGN_IN', token: storeUserData(data)})
    }
  }));

  
  if (state.isLoading) {
    return <Initializing />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken ? (
          <MainStack />
        ) : (
            <AuthStack />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
