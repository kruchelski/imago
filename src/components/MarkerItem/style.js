import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: mainTheme.bg1,
    opacity: 1,
    borderRadius: 5,
    margin: 2,
    marginHorizontal: 7,
    shadowColor: mainTheme.dark,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    height: 200,
    marginBottom: 10,
    width: 130,
    maxWidth: 130,
    minWidth: 130,
  },
  title: {
    color: mainTheme.primary,
    textAlign: 'center',
    fontFamily: appFonts.bold,
    padding: 5,
    marginBottom: 5,
    marginTop: 10,
    fontSize: 14,
  },
  body: {
    color: mainTheme.fg0,
    textAlign: 'justify',
    fontFamily: appFonts.regular,
    padding: 10,
    fontSize: 12,
  },
})

export default styles;