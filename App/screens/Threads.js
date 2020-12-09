import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import { ThreadRow, Separator } from 'genshin-impact-app/App/modules/components';
import { listenToThreads, listenToThreadTracking } from 'genshin-impact-app/App/firebase';

export default class Threads extends React.Component {
  state = {
    threads: [],
    threadTracking: {},
  };

  componentDidMount() {
    this.removeThreadListener = listenToThreads().onSnapshot(querySnapshot => {
      // returns array of threads
      const threads = querySnapshot.docs.map(doc => {
        console.log(doc.id, doc.data());
        return {
          _id: doc.id,
          name: '',
          latestMessage: {text: ''},
          ...doc.data(),
        };
      });

      this.setState({threads});
    });

    this.removeThreadListener = listenToThreadTracking().onSnapshot(
      querySnapshot => {
        console.log(querySnapshot.data());
        this.setState({threadTracking: querySnapshot.data() || {}});
      },
    );
  }

  componentWillUnmount() {
    if (this.removeThreadListener) {
      this.removeThreadListener();
    }

    if (this.removeThreadListener) {
      this.removeThreadListener();
    }
  }

  isThreadUnread = thread => {
    const {threadTracking} = this.state;

    // new message in thread since last checked
    // never viewed thread before (unread)
    if (
      !threadTracking[thread._id] ||
      threadTracking[thread._id].lastRead < thread.latestMessage.createdAt
    ) {
      return true;
    }

    return false;
  };

  render() {
    return (
      <FlatList
        data={this.state.threads}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <ThreadRow
            {...item}
            onPress={() =>
              this.props.navigation.navigate('Messages', {thread: item})
            }
            unread={this.isThreadUnread(item)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    );
  }
}