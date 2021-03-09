import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  button: {
    borderRadius: 6,
    padding: 5,
    borderWidth: 1,
    borderColor: '#333333',
    margin: 10
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    opacity: 0.8,
    backgroundColor: '#333333',
    width: windowWidth,
    height: windowHeight / 3
  },
  topButtonsContainer: {
    position: 'absolute',
    left: 0,
    top: 20,
    backgroundColor: 'transparent',
    width: windowWidth,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomButtonsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 20,
    backgroundColor: 'transparent',
    width: windowWidth,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default styles;