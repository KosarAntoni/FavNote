const initialState = {};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ('LOGOUT_SUCCESS'):
      return {
        state: initialState,
      };
    case ('FETCH_SUCCESS'):
      return {
        ...state,
        [action.payload.itemType]:
          [...action.payload.data],
      };
    case ('AUTHENTICATION_SUCCESS'):
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        userID: action.payload.data._id,
      };
    case ('ADD_ITEM_SUCCESS'):
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType],
          action.payload.data,
        ],
      };
    case ('REMOVE_ITEM_SUCCESS'):
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter(({ _id: id }) => id !== action.payload.id),
        ],
      };
    default: return state;
  }
};

export default rootReducer;
