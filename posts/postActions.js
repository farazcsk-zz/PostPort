import { normalize } from 'normalizr';

import * as schema from './postSchema';

const getPosts = ({ accessToken }) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_POSTS_REQUEST' });

    fetch(`https:graph.facebook.com/me?fields=posts{place, picture}&access_token=${accessToken}`)
      .then((response) => response.json())
      .then((responseData) => {
        const posts = responseData.posts.data;

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
    // https:graph.facebook.com/me?fields=posts{place}&access_token=
};

export {
  getPosts,
};
