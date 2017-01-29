import { AsyncStorage } from 'react-native';

import formatPosts from '../helpers/formatPosts';

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
        return dispatch({
          type: 'GET_USER_ERROR',
          error,
        });
      });
  };
};

const getPosts = () => {
  return (dispatch) => {
    dispatch({ type: 'GET_POSTS_REQUEST' });

    AsyncStorage.getItem('accessToken')
      .then((data) => {
        const accessToken = data;
        fetch(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}`)
          .then(response => response.json())
          .then((responseJson) => {
            const postsWithLocation = formatPosts(responseJson.data);
            return dispatch({
              type: 'GET_POSTS_SUCCESS',
              posts: postsWithLocation,
            });
          });
      })
      .catch((error) => {
        console.error('something went wrong', error);
        return dispatch({
          type: 'GET_POSTS_ERROR',
          error,
        });
      });
  };
};

export {
  getUser,
  getPosts,
};
