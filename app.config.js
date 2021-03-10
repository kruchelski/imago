import dotenv from 'dotenv'
import project from './package.json'

const config = dotenv.config()

if (config.error) {
  throw config.error
}

export default {
  expo: {
    name: 'Imago',
    slug: project.name,
    version: project.version,
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      backgroundColor: '#ffffff',
      image: './src/assets/images/logo.png',
      resizeMode: 'contain',
    },
    extra: {
      ...process.env,
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: [
      '**/*',
    ],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
}