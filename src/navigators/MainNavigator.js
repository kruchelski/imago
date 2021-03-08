import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MapScreen, MenuScreen } from '../screens';
import { MapProvider } from '../contexts';

const MainDrawer = createDrawerNavigator();

export default () => {
  return (
    <MapProvider>
      <MainDrawer.Navigator
        drawerContent={(props) => <MenuScreen {...props} />}
      >
        <MainDrawer.Screen
          name={'Map'}
          component={MapScreen}
          options={{ title: 'Imago' }}
        />
      </MainDrawer.Navigator>
    </MapProvider>
  );
}