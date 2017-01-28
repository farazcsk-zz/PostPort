const initialState = {
  isLoading: false,
  posts: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_REQUEST':
      return {
        isLoading: true,
      };

    case 'GET_USER_SUCCESS':
      return {
        isLoading: false,
        ...action.user,
      };

    case 'GET_POSTS_REQUEST':
      return {
        isLoading: true,
      };

    case 'GET_POSTS_SUCCESS':
      return {
        isLoading: false,
        posts: action.posts,
      };

    case 'LOGOUT':
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default user;
