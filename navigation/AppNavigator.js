import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from '../screens/Cart/Cart';
import Discover from '../screens/Discover/Discover';
import Profile from '../screens/Profile/Profile';
import Star from '../screens/Stars/Stars';
import AddVideo from '../components/AddVideo';
const Tab = createBottomTabNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Discover" component={Discover} options={{ headerShown: false }} />
        <Tab.Screen name="Stars" component={Star} options={{ headerShown: false }}/>
        <Tab.Screen name="Add" component={AddVideo} options={{ headerShown: false }}/>
        <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }}/>
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
};

export default MainStackNavigator;