const genshinApi = (path) => {
  return fetch(`https://genshinlist.com/api${path}`).then((response) =>
    response.json()
  );
};

export default genshinApi;
