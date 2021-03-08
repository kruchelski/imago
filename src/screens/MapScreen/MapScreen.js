import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useMap } from '../../hooks';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './style';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { loadAllData, mapErrorHandler, mapState } = useMap();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let actualLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High
        });
        setLocation(actualLocation)

      } catch (err) {
        setErrorMsg(err.message)
      }
    })();

    const loadMapData = async () => {
      try {
        await loadAllData();
      } catch (err) {
        mapErrorHandler(err, 'An error ocurrer while getting map data');
      }
    }

    loadMapData();
  }, []);

  let message = 'Waiting...';
  if (errorMsg) {
    message = errorMsg;
  } else if (location) {
    message = JSON.stringify(location);
  }

  const initialPosition = {
    latitude: 37.8025259,
    longitude: -122.4351431,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
  }

  return (
    <>
      <View style={styles.container}>
        {location &&
          <MapView style={styles.map}
            region={initialPosition}
            provider='google'
          >
            <Polyline
              coordinates={[
                { latitude: 37.8025259, longitude: -122.4351431 },
                { latitude: 37.7896386, longitude: -122.421646 },
                { latitude: 37.7665248, longitude: -122.4161628 },
                { latitude: 37.7734153, longitude: -122.4577787 },
                { latitude: 37.7948605, longitude: -122.4596065 },
                { latitude: 37.8025259, longitude: -122.4351431 }
              ]}
              strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={[
                '#7F0000',
                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                '#B24112',
                '#E5845C',
                '#238C23',
                '#7F0000'
              ]}
              strokeWidth={6}
              geodesic={true}
            />
            <Marker
              coordinate={{
                latitude: initialPosition.latitude,
                longitude: initialPosition.longitude,
              }}
              title='Opa'
              description='Mas bahhh'
            />
          </MapView>
        }
        <View>
          <Text>
            {message}
          </Text>
        </View>
        <View>
          <Text>
            {JSON.stringify(mapState)}
          </Text>
        </View>
      </View>
    </>
  );
}

export default MapScreen;