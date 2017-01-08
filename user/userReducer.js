const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: action.email,
      };

    case 'UPDATE_PASSWORD':
      return {
        ...state,
        email: action.password,
      };

    case 'UPDATE_FIRSTNAME':
      return {
        ...state,
        temp: tempUser(state.temp, action),
      };

    case 'UPDATE_LASTNAME':
      return {
        ...state,
        temp: tempUser(state.temp, action),
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
