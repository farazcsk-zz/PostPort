import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.posts,
    };
  }
  return state;
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS_SUCCESS':
      return action.response.result;

    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_POSTS_REQUEST':
      return true;

    case 'FETCH_POSTS_SUCCESS':
    case 'FETCH_POSTS_FAILURE':
      return false;

    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_POSTS_FAILURE':
      return action.message;

    case 'FETCH_POSTS_SUCCESS':
    case 'FETCH_POSTS_REQUEST':
      return null;

    default:
      return state;
  }
};

const posts = combineReducers({
  byId,
  allIds,
  isLoading,
  errorMessage,
});

export default posts;

const getAllPosts = (state) => state.allIds.map((id) => state.byId[id]);
const getPost = (state, id) => state.byId[id];
const getIsLoading = (state) => state.isLoading;
const getErrorMessage = (state) => state.errorMessage;

export { getAllPosts, getPost, getIsLoading, getErrorMessage };
