import React from 'react';
import { View, Text, FlatList } from 'react-native';
import DrawItem from '../DrawItem/DrawItem';
import styles from './style';

const DrawList = ({ draws, handleOnItemSelect }) => {

  const selectDraw = (draw) => {
    const { coordinates } = draw;
    const i = Math.floor(Math.random() * (coordinates.length - 1));
    handleOnItemSelect(coordinates[i], draw);
  }

  return (
    <>
      <View>
        <Text
          style={styles.title}
        >
          Draws list
        </Text>
      </View>
      <FlatList
        contentContainerStyle={styles.container}
        data={draws}
        horizontal={true}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text style={styles.error}>
                No draws to display
              </Text>
            </View>
          )
        }}
        keyExtractor={(_, index) => `list-item-${index}`}
        renderItem={(data => {
          return (
            <DrawItem draw={data.item} onItemSelect={selectDraw} />
          )
        })}
      />
    </>
  )
}

export default DrawList;