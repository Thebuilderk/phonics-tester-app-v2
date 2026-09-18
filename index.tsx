import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import AgeSelectionScreen from './screens/AgeSelectionScreen';
import ProfileScreen from './screens/ProfileScreen';
import LearningScreen from './screens/LearningScreen';
import RewardsScreen from './screens/RewardsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AgeSelection" component={AgeSelectionScreen} options={{ title: 'Select Age' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="Learning" component={LearningScreen} options={{ title: 'Learning' }} />
        <Stack.Screen name="Rewards" component={RewardsScreen} options={{ title: 'Rewards' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
