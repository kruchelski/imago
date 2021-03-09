import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../screens';

const MainStack = createStackNavigator();

export default () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <MainStack.Screen
        name={'Map'}
        component={MapScreen}
        options={{ title: 'Imago' }}
      />
    </MainStack.Navigator>
  );
}