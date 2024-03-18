import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Local import
import {StackRoute} from '../NavigationRoutes';
import {StackNav} from '../NavigationKeys';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  // Main Stack
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.Splash}>
      <Stack.Screen name={StackNav.Splash} component={StackRoute.Splash} />
      <Stack.Screen
        name={StackNav.Onboarding}
        component={StackRoute.Onboarding}
      />
      <Stack.Screen
        name={StackNav.HomeScreen}
        component={StackRoute.HomeScreen}
      />
    </Stack.Navigator>
  );
}
