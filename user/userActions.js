const setUser = ({ user }) => {
  return {
    type: 'SET_USER',
    user,
  };
};

const updatePassword = ({ password }) => {
  return {
    type: 'UPDATE_PASSWORD',
    password,
  };
};

const updateEmail = ({ email }) => {
  return {
    type: 'UPDATE_EMAIL',
    email,
  };
};

const updateFirstName = ({ firstName }) => {
  return {
    type: 'UPDATE_FIRST_NAME',
    firstName,
  };
};

const updateLastName = ({ lastName }) => {
  return {
    type: 'UPDATE_LAST_NAME',
    lastName,
  };
};

export {
  setUser,
  updatePassword,
  updateEmail,
  updateFirstName,
  updateLastName,
};
