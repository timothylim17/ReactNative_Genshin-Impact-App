import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN = 'genshin-impact::AUTH_TOKEN';

export const storeUserData = async user => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(user));
  } catch (e) {
    console.log("Failed to store token: ", e);
  }
};

export const getUserData = async () => {
  try {
    let userData = await AsyncStorage.getItem(AUTH_TOKEN);
    let data = JSON.parse(userData);
    console.log('token successful: ', data);
  } catch (e) {
    console.log('token retrieval failed: ', e);
  }
};

export const removeUserData = async () => {
  try {
    let userData = await AsyncStorage.removeItem(AUTH_TOKEN);
    console.log('token removal successful: ', userData);
  } catch (e) {
    console.log('token removal failed: ', e)
  }
};