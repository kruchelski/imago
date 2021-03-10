import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

const DrawItem = ({ draw, onItemSelect }) => {

  return (
    <TouchableOpacity
      onPress={() => onItemSelect(draw)}
    >
      <View
        style={styles.container}
      >
        <Text
          style={styles.title}
        >
          {draw.title}
        </Text>
        <View>
          <Text
            style={styles.body}
          >
            {draw.desc}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default DrawItem;