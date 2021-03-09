import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useMap } from '../../hooks';
import styles from './style';

const SplashScreen = ({ setLoadingApp }) => {
  const { loadAllData, getLocation, mapErrorHandler } = useMap();

  useEffect(() => {
    const loadLocation = async () => {
      try {
        await getLocation()
      } catch (err) {
        mapErrorHandler(
          err,
          'An error ocurred while trying to get location'
        )
      }
    }

    const loadMapData = async () => {
      try {
        await loadAllData();
        setLoadingApp(false);
      } catch (err) {
        mapErrorHandler(
          err,
          'An error occurred while trying to request data from server'
        )
        setLoadingApp(false);
      }
    }

    loadLocation();
    loadMapData();
  }, [])

  return (
    <View style={styles.container}>
      <Text>
        Splash Screen
      </Text>
    </View>
  );
}

export default SplashScreen;