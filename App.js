import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigators from './src/navigators';
import { MapProvider } from './src/contexts';
import {
  useFonts,
  Tajawal_300Light,
  Tajawal_400Regular,
  Tajawal_700Bold,
} from '@expo-google-fonts/tajawal';

function App() {
  let [fontsLoaded] = useFonts({
    Tajawal_300Light,
    Tajawal_400Regular,
    Tajawal_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>
          Loading fonts...
        </Text>
      </View>
    )
  }
  return (
    <NavigationContainer>
      <MapProvider>
        <Navigators />
      </MapProvider>
    </NavigationContainer>
  );
}

export default App;