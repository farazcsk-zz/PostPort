const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  token: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.user,
      };

    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: action.email,
      };

    case 'UPDATE_PASSWORD':
      return {
        ...state,
        password: action.password,
      };

    case 'UPDATE_FIRSTNAME':
      return {
        ...state,
        firstName: action.firstName,
      };

    case 'UPDATE_LASTNAME':
      return {
        ...state,
        lastName: action.lastName,
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
