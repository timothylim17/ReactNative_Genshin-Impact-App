import React from 'react';
import { FlatList, View, Text } from 'react-native';

// import { Status, Separator } from 'genshin-impact-app/App/modules/components';

const Feed = ({ navigation }) => {
  // const { loading, data } = useQuery(requestFeed);
  // const [likeStatusFn] = useMutation(likeStatus);

  // if (loading) return null;

  return (
    // <FlatList
    //   data={data.feed}
    //   renderItem={({ item }) => (
    //     <Status
    //       {...item}
    //       onRowPress={() => navigation.push('Threads', { status: item })}
    //       onHeartPress={() => likeStatusFn({ variables: { statusId: item._id }})}
    //     />
    //   )}
    //   ItemSeparatorComponent={() => <Separator />}
    //   keyExtractor={item => item._id}
    //   ListFooterComponent={<View style={{ flex: 1, marginBottom: 60 }} />}
    // />
    <View>
      <Text>Feed!</Text>
    </View>
  );
};

export default Feed;