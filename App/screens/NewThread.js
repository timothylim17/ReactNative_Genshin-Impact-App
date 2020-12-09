import React, { useState } from 'react';
import { View } from 'react-native';

import { TextField, Button } from 'genshin-impact-app/App/modules/components';
import { createNewThread } from 'genshin-impact-app/App/firebase';

export default function NewThreads({ navigation }) {
  const [roomName, setRoomName] = useState('');

  const handlePress = () => {
    if (roomName.length > 0) {
      // create new thread
      createNewThread(roomName)
        .then(() => {
          navigation.navigate('Threads');
        })
    }
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
