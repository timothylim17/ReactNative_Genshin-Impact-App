export const genshinApi = () => {
  const path = "characters";
  return fetch(`https://genshinlist.com/api/${path}`).then((response) =>
    response.json()
  );
};
