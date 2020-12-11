import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TextField, Button } from 'genshin-impact-app/App/modules/components';
import { createNewThread } from 'genshin-impact-app/App/firebase';

export default function NewThreads() {
  const navigation = useNavigation();
  const [roomName, setRoomName] = useState('');

  const handlePress = () => {
    if (roomName.length > 0) {
      // create new thread
      createNewThread(roomName)
        .then(() => {
          navigation.navigate('Threads');
        })
    }
    Alert.alert(
      "Error",
      "Please include text inside the text field.",
      [
        {
          text: "OK",
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TextField
        placeholder="Thread Name"
        onChangeText={name => setRoomName(name)}
      />
      <Button
        title="Create chat room"
        onPress={handlePress}
      />
    </View>
  );
}
