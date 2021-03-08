import React, { createContext, useState } from 'react';
import { HttpService } from '../services';

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

      console.log(responses)

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
      { children }
    </MapContext.Provider>
  )
}

export { MapContext, MapProvider };