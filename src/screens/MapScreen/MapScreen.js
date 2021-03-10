import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Keyboard } from 'react-native';
import {
  CustomButton,
  ViewPopUp,
  MarkerForm,
  MarkerList,
  DrawForm,
  DrawList
} from '../../components';
import { useMap } from '../../hooks';
import { UtilsService } from '../../services';
import MapView, { Marker, Polyline } from 'react-native-maps';
import styles from './style';
import { markerIcons } from '../../assets';

const MapScreen = () => {
  const _map = useRef(null);
  const {
    mapState,
    addMarker,
    editMarker,
    removeMarker,
    addDraw,
    editDraw,
    removeDraw,
    mapErrorHandler
  } = useMap();
  
  const initialPosition = {
    latitude: mapState?.location?.coords?.latitude || -25.456380280855427,
    longitude: mapState?.location?.coords?.longitude || -49.23582969008207,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
  }

  const [currentRegion, setCurrentRegion] = useState(initialPosition);
  const [tempMarkers, setTempMarkers] = useState([]);
  const [tempDraw, setTempDraw] = useState(null);
  const [drawState, setDrawState] = useState(false);
  const [showViewPopUp, setShowViewPopUp] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const [showDraws, setShowDraws] = useState(true);
  const [showMarkersList, setShowMarkersList] = useState(false);
  const [showDrawsList, setShowDrawsList] = useState(false);
  const [showMarkerForm, setShowMarkerForm] = useState(false);
  const [showDrawForm, setShowDrawForm] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true)
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false)
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [])

  const handleRegionChange = (region) => {
    setCurrentRegion(region);
  }

  const handleCameraChange = (coordinate) => {
    _map.current.animateToRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: currentRegion.latitudeDelta,
      longitudeDelta: currentRegion.longitudeDelta
    }, 200)
  }

  const handleMapTouch = (coordinate) => {
    if (!drawState) {
      handleSingleTouch();
    } else {
      handleDrawTouch(coordinate, null);
    }
  }

  const handleSingleTouch = () => {
    clearScreen();
  }

  const handleLongPress = (coordinate) => {
    if (drawState) {
      return;
    }
    clearScreen();
    let newTempMarker = {
      id: null,
      title: '',
      desc: '',
      type: null,
      color: `#${UtilsService.hexStringGenerator(6)}`,
      coordinate
    }
    const newTempMarkers = [newTempMarker]
    setTempMarkers(newTempMarkers);
    setShowViewPopUp(true);
    setShowMarkerForm(true);
    handleCameraChange(coordinate);

  }

  const handleDrawTouch = (coordinate) => {
    console.log('Draw Touch');
    console.log(coordinate);
  }

  const handleMarkerPress = (id) => {
    if (drawState) {
      return;
    }
    clearScreen();
    const selectedMarker = mapState.markers.find(marker => marker.id === id);
    setShowViewPopUp(false);
    setTempMarkers([]);
    setTempMarkers([selectedMarker]);
    setShowViewPopUp(true);
    setShowMarkerForm(true);
  }

  const handleListShowPress = (type) => {
    switch (type) {
      case 'markers':
        setShowDrawsList(false);
        setShowMarkerForm(false);
        setShowDrawForm(false);
        setShowMarkersList(true);
        break;
      case 'draws':
        setShowMarkersList(false);
        setShowMarkerForm(false);
        setShowDrawForm(false);
        setShowDrawsList(true);
        break;
    }
    setShowViewPopUp(true);
  }

  const handleOnSubmitMarker = async (action, marker) => {
    try {
      const { coordinate, title, desc, color, type, id } = marker;
      switch (action) {
        case 'create':
          await addMarker(coordinate, title, desc, color, type);
          break;
        case 'edit':
          await editMarker(coordinate, title, desc, color, type, id);
          break;
        case 'delete':
          await removeMarker(id);
          break;
      }
      clearScreen();
    } catch (err) {
      mapErrorHandler(err, `Error with marker action ${action}`);
      clearScreen();
    }
  }

  const handleOnSubmitDraw = async (action, draw) => {
    try {
      const { title, desc, color, coordinates, id } = draw;
      switch (action) {
        case 'create':
          await addDraw(title, desc, color, coordinates);
          break;
        case 'edit':
          await editDraw(title, desc, color, coordinates, id);
          break;
        case 'delete':
          await removeDraw(id);
          break;
      }
      clearScreen();
    } catch (err) {
      mapErrorHandler(err, `Error with draw action ${action}`);
      clearScreen();
    }
  }

  const handleDrawSelect = (coordinate, draw) => {
    console.log('uwuwuwu');
    console.log(coordinate);
    console.log(draw);
    clearScreen();
    handleCameraChange(coordinate);
    setTempDraw(draw);
    setShowViewPopUp(true);
    setShowDrawForm(true);
  }

  const clearScreen = () => {
    setShowViewPopUp(false);
    setTempMarkers([]);
    setShowDrawsList(false);
    setShowMarkersList(false);
    setShowDrawForm(false);
    setShowMarkerForm(false);
  }

  return (
    <>
      <View
        style={styles.container}
      >
        {mapState.location &&
          <MapView style={styles.map}
            ref={_map}
            region={currentRegion}
            onPress={(event) => handleMapTouch(event.nativeEvent.coordinate)}
            onLongPress={(event) => handleLongPress(event.nativeEvent.coordinate)}
            onRegionChangeComplete={(region) => handleRegionChange(region)}

          >
            {
              showDraws && mapState.draws.map((draw) => {
                return <Polyline
                  key={draw.id}
                  coordinates={draw.coordinates}
                  strokeColor={draw.color}
                  strokeWidth={5}
                />
              })
            }
            {
              showMarkers && mapState.markers.map((mark) => {
                return <Marker
                  key={mark.id}
                  coordinate={mark.coordinate}
                  title={mark.title}
                  description={mark.desc}
                  image={mark.type !== 'regular' ? markerIcons[mark.type] : null}
                  pinColor={mark.color}
                  onPress={event => {
                    event.stopPropagation();
                    handleMarkerPress(mark.id)
                  }}
                />
              })
            }
            {
              tempMarkers.map((mark, index) => {
                return <Marker
                  key={index}
                  coordinate={mark.coordinate}
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
            onPress={() => { setShowMarkers(!showMarkers) }}
          />

          <CustomButton
            type={showDraws ? 'solid' : 'outline'}
            title={showDraws ? 'DRAWS ON' : 'DRAWS OFF'}
            level={showDraws ? 'primary' : 'secondary'}
            icon='drawing'
            size='small'
            onPress={() => { setShowDraws(!showDraws) }}
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
            disabled={drawState}
            onPress={() => { handleListShowPress('markers') }}
          />

          <CustomButton
            type='outline'
            title='Draws'
            level={showDrawsList ? 'primary' : 'secondary'}
            icon='map-marker-path'
            size='small'
            disabled={drawState}
            onPress={() => { handleListShowPress('draws') }}
          />
          {
            !drawState &&
            <CustomButton
              type='outline'
              title='New Draw'
              level='primary'
              icon='draw'
              size='small'
              onPress={() => {setDrawState(true)}}
            />
          }
          {
            drawState &&
            <CustomButton
              type='solid'
              title='Cancel Draw'
              level='danger'
              icon='cancel'
              size='small'
              onPress={() => {setDrawState(false)}}
            />
          }
        </View>
        {showViewPopUp &&
          <View
            style={isKeyboardOpen ? styles.overlayInv : styles.overlay}
          >
            <ViewPopUp>
              {
                showMarkersList && !showDrawsList && !showMarkerForm && !showDrawForm &&
                <MarkerList 
                  markers={mapState.markers} 
                  handleOnItemSelect={handleCameraChange} 
                />
              }
              {
                showDrawsList && !showMarkersList && !showMarkerForm && !showDrawForm &&
                <DrawList
                  draws={mapState.draws}
                  handleOnItemSelect={handleDrawSelect}
                />
              }
              {
                showMarkerForm && !showDrawForm && !showDrawsList && !showMarkersList && tempMarkers.length &&
                <MarkerForm
                  marker={tempMarkers[0]}
                  onSubmit={handleOnSubmitMarker}
                />
              }
              {
                showDrawForm && !showMarkerForm && !showDrawsList && !showMarkersList &&
                <DrawForm
                  draw={tempDraw}
                  onSubmit={handleOnSubmitDraw}
                />
              }
            </ViewPopUp>
          </View>
        }
      </View>
    </>
  );
}

export default MapScreen;