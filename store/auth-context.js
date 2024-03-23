import { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  email: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  storeEmail: (email) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [authEmail, setAuthEmail] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function storeEmail(email) {
    setAuthEmail(email);
    AsyncStorage.setItem('email', email);
  }

  function logout() {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          style: "destructive",
          onPress: effectiveLogout,
        },
      ]
    );
  }

  function effectiveLogout(){
    setAuthToken(null);
    setAuthEmail(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('email');
  }

  const value = {
    token: authToken,
    email: authEmail,
    isAuthenticated: !!authToken,
    storeEmail: storeEmail,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;