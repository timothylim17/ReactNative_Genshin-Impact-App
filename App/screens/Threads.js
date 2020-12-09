import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { ThreadRow, Separator } from 'genshin-impact-app/App/modules/components';
import { InitializingMessage } from 'genshin-impact-app/App/modules/screens';
import { listenToThreads, listenToThreadTracking } from 'genshin-impact-app/App/firebase';

export default function Threads({ navigation }) {
  const [threads, setThreads] = useState([]);
  const [threadsTracking, setThreadsTracking] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToThreads().onSnapshot(querySnapshot => {
      const thread = querySnapshot.docs.map(doc => {
        return {
          _id: doc.id,
          name: '',
          latestMessage: { text: '' },
          ...doc.data(),
        };
      });
      
      setThreads(thread);
      console.log(thread);
      
      if (loading) setLoading(false);
    });

    const unsubscribeListeners = listenToThreadTracking().onSnapshot(querySnapshot => {
      setThreadsTracking(querySnapshot.data() || {});
    });

    return () => {
      unsubscribe();
      unsubscribeListeners();
    }
  }, []);

  const isThreadUnread = thread => {
    if (
      !threadsTracking[thread._id] ||
      threadsTracking[thread._id].lastRead < thread.latestMessage.createdAt
    ) {
      return true;
    }
    return false;
  }

  if (loading) {
    return <InitializingMessage />;
  }

  return (
    <FlatList
      data={threads}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <ThreadRow
          {...item}
          onPress={() => {
            console.log('item', item);
            navigation.navigate('Messages', { thread: item });
          }}
          unread={isThreadUnread(item)}
        />
      )}
      ItemSeparatorComponent={() => <Separator />}
    />
  );
}
