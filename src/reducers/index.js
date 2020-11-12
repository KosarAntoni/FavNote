const initialState = {
  isLoading: false,
  userJWT: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
        authError: action.errorData.message[0].messages[0].message,
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
        authError: action.errorData.message[0].messages[0].message,
      };
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
        isLoading: false,
        errorInfo: { ...action.errorData },
      };
    case ('FETCH_ITEM_REQUEST'):
      return {
        ...state,
        isLoading: true,
      };
    case ('FETCH_ITEM_SUCCESS'):
      return {
        ...state,
        isLoading: false,
        singleItem: action.payload,
      };
    case ('FETCH_ITEM_FAILURE'):
      return {
        ...state,
        isLoading: false,
        errorInfo: { ...action.errorData },
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
    case ('CLEAR_ERRORS'):
      return {
        ...state,
        authError: null,
        errorInfo: null,
      };
    default: return state;
  }
};

export default rootReducer;
