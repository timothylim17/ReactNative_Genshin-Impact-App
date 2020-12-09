import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import {
  listenToMessages,
  createMessage,
  currentUser,
  markThreadLastRead,
} from 'genshin-impact-app/App/firebase';

export default class Messages extends Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    const thread = this.props.route.params.thread;

    this.removeMessagesListener = listenToMessages(thread._id).onSnapshot(
      querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }

          return data;
        });

        console.log('messages: ', messages);
        this.setState({messages});
      },
    );
  }

  componentWillUnmount() {
    const thread = this.props.route.params.thread;

    // user last saw this message thread
    markThreadLastRead(thread._id);
    if (this.removeMessagesListener) {
      this.removeMessagesListener();
    }
  }

  handleSend = async messages => {
    const text = messages[0].text;
    // Locates the thread being used to send a message.
    const thread = this.props.route.params.thread;

    createMessage(thread._id, text);
  };

  render() {
    const user = currentUser();
    console.log(this.state.messages);

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.handleSend}
        user={{
          _id: user.uid
        }}
      />
    );
  }
}