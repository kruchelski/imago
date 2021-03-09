import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useMap } from '../../hooks';
import MapView, { Marker, Polyline } from 'react-native-maps';
import styles from './style';
import { markerIcons } from '../../assets';

const MapScreen = () => {
  const { mapState } = useMap();

  const initialPosition = {
    latitude: mapState?.location?.coords?.latitude || -25.456380280855427,
    longitude: mapState?.location?.coords?.longitude || -49.23582969008207,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
  }

  return (
    <>
      <View style={styles.container}>
        {mapState.location &&
          <MapView style={styles.map}
            region={initialPosition}
            provider='google'
          >
            {
              mapState.draws.map((draw) => {
                return <Polyline
                  key={draw.id}
                  coordinates={draw.coordinates}
                  strokeColor={draw.color}
                  strokeWidth={5}
                />
              })
            }
            {
              mapState.markers.map((mark) => {
                return <Marker
                  key={mark.id}
                  coordinate={mark.coordinate}
                  title={mark.title}
                  description={mark.desc}
                  image={markerIcons[mark.type]}
                />
              })
            }
          </MapView>
        }
        <View>
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