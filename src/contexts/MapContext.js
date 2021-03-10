import React, { createContext, useState } from 'react';
import { HttpService } from '../services';
import * as Location from 'expo-location';

const MapContext = createContext();

const mapContextApi = (
  mapState,
  setMapState
) => {

  const loadAllData = async () => {
    try {

      let promises = [];

      promises.push(HttpService.makeRequest(
        'getMarkers',
        null,
        null
      ));

      promises.push(HttpService.makeRequest(
        'getDraws',
        null,
        null
      ))

      const responses = await Promise.all(promises);

      if (!responses || !responses.length) {
        throw new Error('Failed to get markers and draws');
      }

      const [markerResponse, drawResponse] = responses;

      setMapState((prevState) => {
        return {
          ...prevState,
          markers: markerResponse.data,
          draws: drawResponse.data,
          error: null
        }
      })

    } catch (err) {
      throw err;
    }
  }

  const addMarker = async (coordinate, title, desc, color, type) => {
    try {
      const requestBody = {
        title,
        desc,
        coordinate,
        color,
        type
      }

      Object.keys(requestBody).forEach(key => {
        if (requestBody[key] === null || requestBody[key] === null) {
          throw new Error('Missing data in the request to save data');
        }
      })

      const markerResponse = await HttpService.makeRequest(
        'createMarker',
        requestBody,
        null
      );

      if (!markerResponse || !markerResponse.data) {
        throw new Error('An error ocurred with json-server');
      }

      setMapState((prevState) => {
        return {
          ...prevState,
          markers: [...prevState.markers, markerResponse.data],
        }
      })

    } catch (err) {
      throw err;
    }
  }

  const editMarker = async (coordinate, title, desc, color, type, id) => {
    try {
      const requestBody = {
        title,
        desc,
        coordinate,
        color,
        type
      }

      Object.keys(requestBody).forEach(key => {
        if (requestBody[key] === null || requestBody[key] === null) {
          throw new Error('Missing data in the request to save data');
        }
      })

      const markerResponse = await HttpService.makeRequest(
        'editMarker',
        requestBody,
        {id}
      );

      if (!markerResponse || !markerResponse.data) {
        throw new Error('An error ocurred with json-server');
      }

      const i = mapState.markers.findIndex(mark => mark.id === id);
      let newMarkers = Array.from(mapState.markers);
      newMarkers.splice(i, 1, markerResponse.data);
      setMapState((prevState) => {
        return {
          ...prevState,
          markers: [...newMarkers],
        }
      })

    } catch (err) {
      throw err;
    }
  }

  const removeMarker = async (id) => {
    try {
      if (id === null || id === undefined) {
        throw new Error('Missing ID in the request');
      }
      await HttpService.makeRequest(
        'deleteMarker',
        null,
        {id}
      )

      const newMarkers = mapState.markers.filter(mark => mark.id !== id);
      setMapState((prevState) => {
        return {
          ...prevState,
          markers: [...newMarkers],
        }
      })
    } catch (err) {
      throw err;
    }
  }

  const addDraw = async (title, desc, color, coordinates) => {
    try {
      const requestBody = {
        title,
        desc,
        color,
        coordinates
      }

      Object.keys(requestBody).forEach(key => {
        if (requestBody[key] === null || requestBody[key] === null) {
          throw new Error('Missing data in the request to save data');
        }
      })

      const drawResponse = await HttpService.makeRequest(
        'createDraw',
        requestBody,
        null
      );

      if (!drawResponse || !drawResponse.data) {
        throw new Error('An error ocurred with json-server');
      }

      setMapState((prevState) => {
        return {
          ...prevState,
          draws: [...prevState.draws, drawResponse.data],
        }
      })

    } catch (err) {
      throw err;
    }
  }

  const editDraw = async (title, desc, color, coordinates, id) => {
    try {
      const requestBody = {
        title,
        desc,
        color,
        coordinates,
      }

      Object.keys(requestBody).forEach(key => {
        if (requestBody[key] === null || requestBody[key] === null) {
          throw new Error('Missing data in the request to save data');
        }
      })

      const markerResponse = await HttpService.makeRequest(
        'editDraw',
        requestBody,
        {id}
      );

      if (!markerResponse || !markerResponse.data) {
        throw new Error('An error ocurred with json-server');
      }

      const i = mapState.draws.findIndex(draw => draw.id === id);
      let newDraws = Array.from(mapState.draws);
      newDraws.splice(i, 1, markerResponse.data);
      setMapState((prevState) => {
        return {
          ...prevState,
          draws: [...newDraws],
        }
      })

    } catch (err) {
      throw err;
    }
  }

  const removeDraw = async (id) => {
    try {
      if (id === null || id === undefined) {
        throw new Error('Missing ID in the request');
      }
      console.log('Fazendo request para apagar o draw')
      await HttpService.makeRequest(
        'deleteDraw',
        null,
        {id}
      )
      console.log('Request feita');
      console.log('Draws atuais')
      console.log(mapState.draws);

      const newDraws = mapState.draws.filter(draw => draw.id !== id);

      console.log('New Draws');
      console.log(newDraws);
      setMapState((prevState) => {
        return {
          ...prevState,
          draws: [...newDraws],
        }
      })
    } catch (err) {
      throw err;
    }
  }

  const getLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access location was denied');
      }

      let actualLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      console.log(actualLocation)

      setMapState(prevState => {
        return {
          ...prevState,
          location: actualLocation
        }
      })

    } catch (err) {
      throw err;
    }
  }

  const mapErrorHandler = (
    errorObject,
    defaultMessage = null
  ) => {
    setMapState(prevState => {
      return {
        ...prevState,
        error: errorObject?.error ||
          errorObject?.message ||
          defaultMessage ||
          'An unexpected data request error happened',
      }
    })
  }

  return {
    loadAllData,
    addMarker,
    editMarker,
    removeMarker,
    addDraw,
    editDraw,
    removeDraw,
    getLocation,
    mapErrorHandler
  }
}

const MapProvider = ({ children }) => {
  const initialState = {
    markers: [],
    draws: [],
    error: null
  }

  const [mapState, setMapState] = useState({
    ...initialState
  });

  return (
    <MapContext.Provider
      value={{
        mapState,
        ...mapContextApi(mapState, setMapState)
      }}
    >
      { children}
    </MapContext.Provider>
  )
}

export { MapContext, MapProvider };