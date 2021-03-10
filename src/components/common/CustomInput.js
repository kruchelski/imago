import React from 'react';
import { Input } from 'react-native-elements';
import { mainTheme, appFonts } from '../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput = (props) => {
  const level = props.level;
  const icon = props.icon;

  return <Input
    {...props}
    leftIcon={
      icon ?
        <Icon
          name={icon}
          size={14}
          color={customStyle.icon[level]}
        /> :
        null
    }
    inputStyle={customStyle.input}
    labelStyle={customStyle.label[level]}
    inputContainerStyle={customStyle.container[level]}
    placeholderTextColor={`${mainTheme.fg1}ae`}
    

  />
}

const customStyle = {
  input: {
    color: mainTheme.fg0,
    fontSize: 14,
    fontFamily: appFonts.regular
  },
  label: {
    primary: {
      color: mainTheme.primary,
      fontSize: 14,
    },
    secondary: {
      color: mainTheme.secondary,
      fontSize: 14,
    }
  },
  container: {
    primary: {
      borderBottomColor: mainTheme.primary
    },
    secondary: {
      borderBottomColor: mainTheme.secondary
    }
  },
  icon: {
    primary: mainTheme.primary,
    secondary: mainTheme.secondary
  }
}

export default CustomInput;