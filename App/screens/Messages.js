import React, { useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import {
  listenToMessages,
  createMessage,
  currentUser,
  markThreadLastRead,
} from 'genshin-impact-app/App/firebase';

export default function Messages({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const { thread } = route.params;
  const user = currentUser();

  useEffect(() => {
    const unsubscribeListener = listenToMessages(thread._id).onSnapshot(querySnapshot => {
      const message = querySnapshot.docs.map(doc => {
        const firebaseData = doc.data();

        const data = {
          _id: doc.id,
          text: '',
          createdAt: new Date().getTime(),
          ...firebaseData
        };

        if (!firebaseData.system) {
          data.user = {
            ...firebaseData.user,
            name: firebaseData.user.displayName
          }
        }

        return data;
      });

      setMessages(message);
    });

    return () => {
      unsubscribeListener();
      markThreadLastRead(thread._id);
    };
  }, []);
  
  const handleSend = async messages => {
    const text = messages[0].text;
    createMessage(thread._id, text);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        _id: user.uid
      }}
    />
  );
}