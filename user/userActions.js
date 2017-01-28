const setUser = ({ user }) => {
  return {
    type: 'SET_USER',
    user,
  };
};

export {
  setUser,
};
