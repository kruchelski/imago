import React from 'react';
import { Button } from 'react-native-elements';
import { mainTheme, appFonts } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomButton = (props) => {
  const level = props.level;
  const buttonType = props.type;
  const icon = props.icon;
  const size = props.size;

  const sizeEnum = {
    icon: {
      small: 12,
      regular: 16,
      big: 20
    },
    text: {
      small: 12,
      regular: 16,
      big: 20
    }
  }

  const customStyle = {
    solid: {
      primary: {
        backgroundColor: mainTheme.primary,
        color: mainTheme.light,
        fontFamily: appFonts.regular,
        fontSize: sizeEnum.text[size]
      },
      secondary: {
        backgroundColor: mainTheme.secondary,
        color: mainTheme.light,
        fontFamily: appFonts.regular,
        fontSize: sizeEnum.text[size]
      }
    },
    outline: {
      primary: {
        borderColor: mainTheme.primary,
        color: mainTheme.primary,
        fontFamily: appFonts.regular,
        fontSize: sizeEnum.text[size]
      },
      secondary: {
        borderColor: mainTheme.secondary,
        color: mainTheme.secondary,
        fontFamily: appFonts.regular,
        fontSize: sizeEnum.text[size]
      }
    },
    icon: {
      solid: {
        primary: mainTheme.light,
        secondary: mainTheme.light
      },
      outline: {
        primary: mainTheme.primary,
        secondary: mainTheme.secondary
      }
    }
  }

  return <Button
    {...props}
    icon={icon ?
      <Icon
        name={icon}
        size={sizeEnum.icon[size]}
        style={{ marginRight: 3 }}
        color={customStyle.icon[buttonType][level]}
      /> :
      null
    }
    buttonStyle={customStyle[buttonType][level]}
    titleStyle={customStyle[buttonType][level]}
  />  
}
export default CustomButton;