import React from 'react';
import type {Node} from 'react';
import {
  Text,
  View,
} from 'react-native';
import MainStackNavigator from './navigation/AppNavigator';
const App: () => Node = () => {

  return (
  <MainStackNavigator />
  );
};


export default App;