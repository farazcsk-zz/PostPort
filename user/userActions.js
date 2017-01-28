import { AsyncStorage } from 'react-native';

const setUser = ({ user }) => {
  return {
    type: 'SET_USER',
    user,
  };
};

const getUser = () => {
  console.log('getting the user...');
  AsyncStorage.getItem('accessToken')
    .then((data) => {
      const accessToken = data;
      fetch(`https://api.instagram.com/v1/users/self/?access_token=${accessToken}`)
        .then(response => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        });
    })
    .catch((error) => {
      console.error(error);
    });
  return {
    type: 'GET_USER',
  };
};

export {
  setUser,
  getUser,
};
