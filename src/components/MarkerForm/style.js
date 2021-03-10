import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10,
    backgroundColor: mainTheme.bg0,
    opacity: 1
  },
  title: {
    color: mainTheme.primary,
    textAlign: 'center',
    marginTop: 2,
    fontFamily: appFonts.bold
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 0,
    marginTop: 0
  }
})

export default styles;