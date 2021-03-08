import React, { useState } from 'react';
import MainNavigator from './MainNavigator';
import { SplashScreen } from '../screens';

const Navigators = () => {
  const [loadingApp, setLoadingApp] = useState(false);

  if (loadingApp) {
    return <SplashScreen setLoadingApp={setLoadingApp} />
  }
  return <MainNavigator />
}

export default Navigators;