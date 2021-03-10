import React from 'react';
import { View, Text, FlatList } from 'react-native';
import MarkerItem from '../MarkerItem/MarkerItem';
import styles from './style';

const MarkerList = ({ markers, handleOnItemSelect }) => {

  return (
    <>
      <View>
        <Text
          style={styles.title}
        >
          Markers's list
        </Text>
      </View>
      <FlatList
        contentContainerStyle={styles.container}
        data={markers}
        horizontal={true}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text style={styles.error}>
                No markers to display
        </Text>
            </View>
          )
        }}
        keyExtractor={(_, index) => `list-item-${index}`}
        renderItem={(data => {
          return (
            <MarkerItem marker={data.item} onItemSelect={handleOnItemSelect} />
          )
        })}
      />
    </>
  )
}

export default MarkerList;