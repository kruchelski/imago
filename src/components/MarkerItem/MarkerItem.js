import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';

const MarkerItem = ({ marker, onItemSelect }) => {

  return (
    <TouchableOpacity
      onPress={() => onItemSelect(marker.coordinate)}
    >
      <View
        style={styles.container}
      >
        <Text
          style={styles.title}
        >
          {marker.title}
        </Text>
        <View>
          <Text
            style={styles.body}
          >
            {marker.desc}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MarkerItem;