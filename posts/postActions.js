import { normalize } from 'normalizr';

import * as schema from './postSchema';
import formatPosts from '../helpers/formatPosts';

const getPosts = ({ accessToken }) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_POSTS_REQUEST' });

    fetch(`https:graph.facebook.com/me?fields=posts{message, place, full_picture}&access_token=${accessToken}`)
      .then((response) => response.json())
      .then((responseData) => {
        const posts = formatPosts(responseData.posts.data);
        return dispatch({
          type: 'FETCH_POSTS_SUCCESS',
          response: normalize(posts, schema.postListSchema),
        });
      })
      .catch((error) => {
        console.log(error);
        return dispatch({
          type: 'FETCH_POSTS_ERROR',
          error,
        });
      });
  };
};

export {
  getPosts,
};
