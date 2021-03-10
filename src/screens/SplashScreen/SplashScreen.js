import React, { useEffect } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { mainTheme } from '../../constants';
import { useMap } from '../../hooks';
import { logo } from '../../assets';
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
      <Image source={logo} style={styles.logoImage} />
      <ActivityIndicator size="large" color={mainTheme.primary} />
    </View>
  );
}

export default SplashScreen;