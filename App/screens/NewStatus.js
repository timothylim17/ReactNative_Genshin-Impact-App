import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
//import { NewStatusInput, Header } from 'genshin-impact-app/App/modules/components';

export default ({ navigation }) => {
  // const parentStatus = navigation.getParam('parent', {});
  // const [statusText, setStatusText] = useState('');

  // const refetchQueries = [];
  // if (parentStatus._id) {
  //   refetchQueries.push({
  //     query: requestResponses,
  //     variables: { _id: parentStatus._id}
  //   })
  // } else {
  //   refetchQueries.push({
  //     query: requestFeed,
  //   });
  // }

  // const [createStatusFn] = useMutation(createStatus, {
  //   refetchQueries,
  // });

  return (
    <React.Fragment>
      {/* <Header
        onLeftPress={() => navigation.pop()}
        leftText="Cancel"
        onRightPress={() => createStatusFn({
          variables: { statusText, parentStatusId: parentStatus._id}
        }).then(() => navigation.pop())}
        rightText="Post"
      />

      <ScrollView
        style={{ backgroundColor: 'rgba(27,31,35,.05)' }}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: 'rgba(27,31,35,.05)',
        }}
      >
        <NewStatusInput placeholder="What's the latest?" onChangeText={text => setStatusText(text)}/>
      </ScrollView> */}
      <View>
        <Text>News Feed!</Text>
      </View>
    </React.Fragment>
  );
};
