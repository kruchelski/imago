import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigators from './src/navigators';
import { MapProvider } from './src/contexts';

function App() {
  return (
    <NavigationContainer>
      <MapProvider>
        <Navigators />
      </MapProvider>
    </NavigationContainer>
  );
}

export default App;