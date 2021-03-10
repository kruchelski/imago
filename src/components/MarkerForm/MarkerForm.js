import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { UtilsService } from '../../services';
import styles from './style';
import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';

const MarkerForm = ({ marker, onSubmit }) => {
  const [title, setTitle] = useState(marker.title);
  const [desc, setDesc] = useState(marker.desc);

  const finishEdit = (action) => {
    if (action === 'delete') {
      onSubmit(action, marker);
      return;
    }
    const newMarker = {
      ...marker,
      title,
      desc,
      type: marker.type ? marker.type : UtilsService.randomMarkerIcon()
    }

    onSubmit(action, newMarker);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text
        style={styles.title}
      >
        Marker editor
      </Text>
      <CustomInput
        level='primary'
        icon='map-marker-plus'
        label='Marker title'
        placeholder='Enter the title of the marker'
        value={title}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(text) => setTitle(text)}
      />
      <CustomInput
        level='primary'
        icon='map-marker-question'
        label='Description'
        placeholder='Enter the description of the marker'
        value={desc}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(text) => setDesc(text)}
      />

      {
        (marker.id === null || marker.id === undefined) &&
        <View
          style={styles.buttonsContainer}
        >
          <CustomButton
            type='solid'
            title='Add'
            level='primary'
            icon='map-marker-check'
            size='regular'
            onPress={() => { finishEdit('create') }}
          />
        </View>
      }
      {
        marker.id !== null && marker.id !== undefined &&
        <View
          style={styles.buttonsContainer}
        >
          <CustomButton
            type='outline'
            title='Delete'
            level='danger'
            icon='map-marker-remove'
            size='regular'
            onPress={() => { finishEdit('delete') }}
          />
          <CustomButton
            type='solid'
            title='Save'
            level='secondary'
            icon='map-marker-check'
            size='regular'
            onPress={() => { finishEdit('edit') }}
          />
        </View>
      }
    </ScrollView>
  )
}

export default MarkerForm;