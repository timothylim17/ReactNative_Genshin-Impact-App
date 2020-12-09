import React from 'react';
import { FlatList, View, Text } from 'react-native';

// import {
//   Status,
//   Separator,
//   Button
// } from 'genshin-impact-app/App/modules/components';


const Thread = ({ navigation }) => {
  // const originalStatus = navigation.getParam('status', {});
  // const { loading, data } = useQuery(requestResponses, {
  //   variables: { _id: originalStatus._id },
  // });

  // const [likeStatusFn] = useMutation(likeStatus);

  // if (loading) return null;

  return (
    // <FlatList
    //   data={data.responses}
    //   renderItem={({ item }) => (
    //     <Status
    //       {...item}
    //       onHeartPress={() => likeStatusFn({ variables: { statusId: item._id}})}
    //       indent={item._id !== originalStatus._id}
    //     />
    //   )}
    //   ItemSeparatorComponent={() => <Separator />}
    //   keyExtractor={item => item._id}
    //   ListFooterComponent={
    //     <View
    //       style={{
    //         flex: 1,
    //         marginBottom: 60,
    //         marginHorizontal: 30,
    //         marginTop: 10,
    //       }}
    //     >
    //       <Button
    //         text="New Reply"
    //         onPress={() =>
    //           navigation.navigate('NewStatus', { parent: originalStatus })
    //         }
    //       />
    //     </View>
    //   }
    // />
    <View>
      <Text>Threads!</Text>
    </View>
  );
};

export default Thread;
