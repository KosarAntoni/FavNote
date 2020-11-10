const initialState = {
  isLoading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ('LOGOUT'):
      return {
        state: initialState,
      };
    case ('FETCH_REQUEST'):
      return {
        ...state,
        isLoading: true,
      };
    case ('FETCH_SUCCESS'):
      return {
        ...state,
        isLoading: false,
        [action.payload.itemType]:
          [...action.payload.data],
      };
    case ('FETCH_FAILURE'):
      return {
        ...state,
        isLoading: true,
      };
    case ('AUTHENTICATION_REQUEST'):
      return {
        ...state,
        isLoading: true,
      };
    case ('AUTHENTICATION_SUCCESS'):
      return {
        ...state,
        isLoading: false,
        userJWT: action.payload.data.jwt,
        userID: action.payload.data.user.id,
        username: action.payload.data.user.username,
      };
    case ('AUTHENTICATION_FAILURE'):
      return {
        ...state,
        isLoading: false,
      };
    case ('REGISTRATION_REQUEST'):
      return {
        ...state,
        isLoading: true,
      };
    case ('REGISTRATION_SUCCESS'):
      return {
        ...state,
        isLoading: false,
        userJWT: action.payload.data.jwt,
        userID: action.payload.data.user.id,
        username: action.payload.data.user.username,
      };
    case ('REGISTRATION_FAILURE'):
      return {
        ...state,
        isLoading: false,
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
          ...state[action.payload.itemType].filter(({ id }) => id !== action.payload.id),
        ],
      };
    default: return state;
  }
};

export default rootReducer;
