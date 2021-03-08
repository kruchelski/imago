import axios from 'axios';
import Constants from 'expo-constants';

const { FAKE_BACKEND_BASE_URL } = Constants.manifest.extra;

export const jsonServer = axios.create({
  baseURL: FAKE_BACKEND_BASE_URL,
})