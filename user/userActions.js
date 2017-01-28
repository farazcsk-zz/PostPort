import { AsyncStorage } from 'react-native';


const getUser = () => {

  return (dispatch) => {
    dispatch({ type: 'GET_USER_REQUEST' });

    AsyncStorage.getItem('accessToken')
      .then((data) => {
        const accessToken = data;
        fetch(`https://api.instagram.com/v1/users/self/?access_token=${accessToken}`)
          .then(response => response.json())
          .then((responseJson) => {
            return dispatch({
              type: 'GET_USER_SUCCESS',
              user: responseJson.data,
            });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export {
  getUser,
};
