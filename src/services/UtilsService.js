import { markerIcons } from '../assets';

const hexStringGenerator = (length) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 15.9).toString(16)
  }
  return result;
}

const randomMarkerIcon = () => {
  const options = ['yay', 'cool', 'regular', 'ok', 'meh', 'terrible'];
  const length = options.length;
  const i = Math.floor(Math.random() * length - 0.1);
  return options[i];
}

export {
  hexStringGenerator,
  randomMarkerIcon
}