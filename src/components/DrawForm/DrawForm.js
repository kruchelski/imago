import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './style';
import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';

const DrawForm = ({ draw, onSubmit }) => {
  const [title, setTitle] = useState(draw.title);
  const [desc, setDesc] = useState(draw.desc);

  const finishEdit = (action) => {
    if (action === 'delete') {
      onSubmit(action, draw);
      return;
    }
    const newDraw = {
      ...draw,
      title,
      desc,
    }
    console.log('NOVO DRAW');
    console.log(newDraw)

    onSubmit(action, newDraw);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text
        style={styles.title}
      >
        Draw editor
      </Text>
      <CustomInput
        level='secondary'
        icon='selection-marker'
        label='Draw title'
        placeholder='Enter the title of the draw'
        value={title}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(text) => setTitle(text)}
      />
      <CustomInput
        level='secondary'
        icon='toy-brick-marker'
        label='Description'
        placeholder='Enter the description of the draw'
        value={desc}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(text) => setDesc(text)}
      />

      {
        (draw.id === null || draw.id === undefined) &&
        <View
          style={styles.buttonsContainer}
        >
          <CustomButton
            type='solid'
            title='Add'
            level='primary'
            icon='marker'
            size='regular'
            onPress={() => { finishEdit('create') }}
          />
        </View>
      }
      {
        draw.id !== null && draw.id !== undefined &&
        <View
          style={styles.buttonsContainer}
        >
          <CustomButton
            type='outline'
            title='Delete'
            level='danger'
            icon='marker-cancel'
            size='regular'
            onPress={() => { finishEdit('delete') }}
          />
          <CustomButton
            type='solid'
            title='Save'
            level='secondary'
            icon='marker'
            size='regular'
            onPress={() => { finishEdit('edit') }}
          />
        </View>
      }
    </ScrollView>
  )
}

export default DrawForm;