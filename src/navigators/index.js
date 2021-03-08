import React, { useState } from 'react';
import MainNavigator from './MainNavigator';
import { SplashScreen } from '../screens';

const Navigators = () => {
  const [loadingApp, setLoadingApp] = useState(true);

  if (loadingApp) {
    return <SplashScreen setLoadingApp={setLoadingApp} />
  }
  return <MainNavigator />
}