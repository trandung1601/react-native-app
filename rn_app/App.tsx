import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import AnimationScreen from './src/screens/AnimationScreen';
import BluetoothScreen from './src/screens/BluetoothScreen';
import HomeScreen from './src/screens/HomeScreen';
import Spotify from './src/screens/Spotify';
import SequenceScreen from './src/screens/SequenceScreen';
import {SpeedOdometer} from './src/screens';

export type RootStackParamList = {
  HomeScreen: undefined;
  BluetoothScreen: undefined;
  AnimationScreen: undefined;
  Spotify: undefined;
  SequenceScreen: undefined;
  SpeedOdometer: undefined;
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
        <Stack.Screen
          name="SequenceScreen"
          component={SequenceScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SpeedOdometer"
          component={SpeedOdometer}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
