import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: mainTheme.bg0,
    opacity: 1,
    padding: 10,
    paddingHorizontal: 5,
  },
  title: {
    color: mainTheme.secondary,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: appFonts.bold
  },
  error: {
    margin: 10,
    padding: 20,
    width: '100%',
    height: '100%',
    borderColor: mainTheme.danger,
    borderWidth: 1,
    borderRadius: 6,
    textAlign: 'center',
    fontFamily: appFonts.regular,
    color: mainTheme.danger
  }
})

export default styles;