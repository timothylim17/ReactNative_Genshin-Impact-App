import * as firebase from 'firebase';
import 'firebase/firestore';

const currentUser = () => firebase.auth().currentUser.toJSON();

const listenToMessages = threadId => {
  return firebase
    .firestore()
    .collection('MESSAGE_THREADS')
    .doc(threadId)
    .collection('MESSAGES')
    .orderBy('createdAt', 'desc');
};

const createMessage = async (threadId, text) => {
  const user = currentUser();

  await firebase
    .firestore()
    .collection('MESSAGE_THREADS')
    .doc(threadId)
    .set(
      {
        latestMessage: {
          text,
          createdAt: new Date().getTime(),
        },
      },
      {
        merge: true,
      },
    );

  return firebase
    .firestore()
    .collection('MESSAGE_THREADS')
    .doc(threadId)
    .collection('MESSAGES')
    .add({
      text: text,
      createdAt: new Date().getTime(),
      user: {
        _id: user.uid,
        displayName: user.displayName,
      },
    });
};

const createNewThread = name => {
  return firebase
    .firestore()
    .collection('MESSAGE_THREADS')
    .add({
      name: name,
      latestMessage: {
        text: `${name} created.`,
        createdAt: new Date().getTime(),
      },
    })
    .then(docRef => {
      docRef.collection('MESSAGES').add({
        text: `${name} created.`,
        createdAt: new Date().getTime(),
        system: true,
      });
    });
};

const listenToThreads = () => {
  return firebase
    .firestore()
    .collection('MESSAGE_THREADS')
    .orderBy('latestMessage.createdAt', 'desc');
};

const markThreadLastRead = threadId => {
  const user = currentUser();

  return firebase
    .firestore()
    .collection('USER_THREAD_TRACK')
    .doc(user.uid)
    .set(
      {
        [threadId]: {
          lastRead: new Date().getTime(),
        },
      },
      {merge: true},
    );
};

const listenToThreadTracking = () => {
  const user = currentUser();

  return firebase
    .firestore()
    .collection('USER_THREAD_TRACK')
    .doc(user.uid);
};

export {
  currentUser,
  createMessage,
  createNewThread,
  listenToMessages,
  listenToThreads,
  markThreadLastRead,
  listenToThreadTracking
}; 