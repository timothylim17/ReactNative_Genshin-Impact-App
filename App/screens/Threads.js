import React, { Component } from 'react';
import { FlatList } from 'react-native';

import { ThreadRow, Separator } from 'genshin-impact-app/App/modules/components';
import { listenToThreads, listenToThreadTracking } from 'genshin-impact-app/App/firebase';

export default class Threads extends Component {
  state = {
    threads: [],
    threadTracking: {},
  };

  componentDidMount() {
    this.removeThreadListener = listenToThreads().onSnapshot(querySnapshot => {
      const threads = querySnapshot.docs.map(doc => ({
        _id: doc.id,
        name: '',
        latestMessage: {text: ''},
        ...doc.data(),
      }));

      console.log(threads);

      this.setState({threads});
    });

    this.removeThreadListener = listenToThreadTracking().onSnapshot(
      querySnapshot => {
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

    // new message in thread sicne we last checked
    // never viewed that thread before (unread)
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