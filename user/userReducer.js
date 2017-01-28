const initialState = {
  isLoading: false,
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

    case 'LOGOUT':
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default user;
