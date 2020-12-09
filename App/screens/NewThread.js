import React, { Component } from 'react';
import { View } from 'react-native';

import { TextField, Button } from 'genshin-impact-app/App/modules/components';
import { createNewThread } from 'genshin-impact-app/App/firebase';

export default class NewThread extends Component {
  state = {
    name: '',
    loading: false,
  };

  handlePress = () => {
    if (this.state.name.length > 0) {
      this.setState({loading: true}, () => {
        return createNewThread(this.state.name)
          .then(() => {
            this.props.navigation.pop();
          })
          .finally(() => {
            this.setState({loading: false});
          });
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextField
          placeholder="Thread Name"
          onChangeText={name => this.setState({name})}
        />
        <Button
          onPress={this.handlePress}
          title="Create"
          disabled={this.state.loading}
        />
      </View>
    );
  }
}
