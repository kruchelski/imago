import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigators from './src/navigators';

function App() {
  return (
    <NavigationContainer>
      <Navigators />
    </NavigationContainer>
  );
}

export default App;