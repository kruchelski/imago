import { useContext } from 'react';
import { MapContext } from '../contexts';

export default () => {
  const context = useContext(MapContext);

  return context;
}