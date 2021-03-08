import axios from 'axios';
import { FAKE_BACKEND_BASE_URL } from '@env';

export const jsonServer = axios.create({
  baseUrl: FAKE_BACKEND_BASE_URL,
})