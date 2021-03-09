import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { CustomButton, CustomInput } from '../../components';
import { ViewPopUp } from '../../components';
import { useMap } from '../../hooks';
import { UtilsService } from '../../services';
import MapView, { Marker, Polyline } from 'react-native-maps';
import styles from './style';
import { markerIcons } from '../../assets';

const MapScreen = () => {
  const _map = useRef(null);
  const initialPosition = {
    latitude: -25.456380280855427,
    longitude: -49.23582969008207,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
  }

  const { mapState } = useMap();
  const [currentRegion, setCurrentRegion] = useState(initialPosition);
  const [tempMarkers, setTempMarkers] = useState([]);
  const [tempDraw, setTempDraw] = useState(null);
  const [drawState, setDrawState] = useState(false);
  const [showViewPopUp, setShowViewPopUp] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const [showDraws, setShowDraws] = useState(true);
  const [showMarkersList, setShowMarkersList] = useState(false);
  const [showDrawsList, setShowDrawsList] = useState(false);

  const handleRegionChange = (region) => {
    setCurrentRegion(region);
  }

  const handleMapTouch = (coordinate) => {
    console.log('XABLAU')
    if (!drawState) {
      handleSingleTouch(coordinate);
    } else {
      handleDrawTouch(coordinate);
    }
  }

  const handleSingleTouch = (coordinate) => {
    if (tempMarkers && tempMarkers.length) {
      setShowViewPopUp(false);
      setTempMarkers([]);
      return;
    }
    let newTempMarker = {
      color: `#${UtilsService.hexStringGenerator(6)}`,
      coordinate
    }
    setTempMarkers([newTempMarker])
    setShowViewPopUp(true);
    _map.current.animateToRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: currentRegion.latitudeDelta,
      longitudeDelta: currentRegion.longitudeDelta
    }, 200)
  }

  const handleDrawTouch = (coordinate) => {
    console.log('Draw Touch');
    console.log(coordinate)
  }

  return (
    <>
      <View style={styles.container}>
        {mapState.location &&
          <MapView style={styles.map}
            ref={_map}
            region={currentRegion}
            onPress={(event) => handleMapTouch(event.nativeEvent.coordinate)}
            onRegionChangeComplete={(region) => handleRegionChange(region)}
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
            {
              tempMarkers.map((mark, index) => {
                return <Marker
                  key={index}
                  coordinate={mark.coordinate}
                  title='Add this mark?'
                  description=''
                  pinColor={mark.color}
                />
              })
            }
          </MapView>
        }
        <View
          style={styles.topButtonsContainer}
        >
          <CustomButton
            type={showMarkers ? 'solid' : 'outline'}
            title={showMarkers ? 'MARKERS ON' : 'MARKERS OFF'}
            level={showMarkers ? 'primary' : 'secondary'}
            icon='map-marker'
            size='small'
            onPress={() => { }}
          />

          <CustomButton
            type={showDraws ? 'solid' : 'outline'}
            title={showDraws ? 'DRAWS ON' : 'DRAWS OFF'}
            level={showDraws ? 'primary' : 'secondary'}
            icon='drawing'
            size='small'
            onPress={() => { }}
          />

        </View>
        <View
          style={styles.bottomButtonsContainer}
        >
          <CustomButton
            type='outline'
            title='Markers'
            level={showMarkersList ? 'primary' : 'secondary'}
            icon='map-marker-multiple'
            size='small'
            onPress={() => { }}
          />

          <CustomButton
            type='outline'
            title='Draws'
            level={showDrawsList ? 'primary' : 'secondary'}
            icon='map-marker-path'
            size='small'
            onPress={() => { }}
          />

          <CustomButton
            type='outline'
            title='New Draw'
            level='primary'
            icon='draw'
            size='small'
            onPress={() => { }}
          />
        </View>
        {showViewPopUp &&
          <View
            style={styles.overlay}
          >
            <ViewPopUp>
              <Text>
                Teste Teste
            </Text>
              <Text>
                Teste Teste
            </Text>
              <Text>
                Teste Teste
            </Text>
            </ViewPopUp>
          </View>}
      </View>
    </>
  );
}

export default MapScreen;