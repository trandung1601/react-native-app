import type {RouteConfig, StackNavigationState} from '@react-navigation/core';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationEventMap,
  StackNavigationOptions,
} from '@react-navigation/stack';
import * as React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import BluetoothScreen from './src/screens/BluetoothScreen';
import AnimationScreen from './src/screens/AnimationScreen';
import Spotify from './src/screens/Spotify';

export type RootStackParamList = {
  HomeScreen: undefined;
  BluetoothScreen: undefined;
  AnimationScreen: undefined;
  Spotify: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="BluetoothScreen"
          component={BluetoothScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="AnimationScreen"
          component={AnimationScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Spotify"
          component={Spotify}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
