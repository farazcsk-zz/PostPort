import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.places,
    };
  }

  return state;
};

const places = combineReducers({
  byId,
});

export default places;
