import axios from 'axios';

export const authenticate = (identifier, password) => (dispatch) => {
  dispatch({ type: 'AUTHENTICATION_REQUEST' });

  return axios
    .post('http://localhost:1337/auth/local', {
      identifier,
      password,
    }).then((payload) => {
      dispatch({ type: 'AUTHENTICATION_SUCCESS', payload });
    })
    .catch(() => {
      dispatch({ type: 'AUTHENTICATION_FAILURE' });
    });
};

export const register = (username, email, password) => (dispatch) => {
  dispatch({ type: 'REGISTRATION_REQUEST' });

  return axios
    .post('http://localhost:1337/auth/local/register', {
      username,
      email,
      password,
    }).then((payload) => {
      dispatch({ type: 'REGISTRATION_SUCCESS', payload });
    })
    .catch(() => {
      dispatch({ type: 'REGISTRATION_FAILURE' });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};

export const fetchItems = (itemType) => (dispatch, getState) => {
  dispatch({ type: 'FETCH_REQUEST' });

  return axios
    .get('http://localhost:1337/notes', {
      headers: {
        Authorization:
          `Bearer ${getState().userID}`,
      },
      params: {
        type: itemType,
      },
    })
    .then(({ data }) => {
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: {
          data,
          itemType,
        },
      });
    })
    .catch(() => {
      dispatch({ type: 'FETCH_FAILURE' });
    });
};

export const removeItem = (itemType, id) => (dispatch, getState) => {
  dispatch({ type: 'REMOVE_ITEM_REQUEST' });
  axios.delete(`http://localhost:1337/notes/${id}`, {
    headers: {
      Authorization:
        `Bearer ${getState().userID}`,
    },
  }).then(() => (
    dispatch({
      type: 'REMOVE_ITEM_SUCCESS',
      payload: {
        itemType,
        id,
      },
    })
  ))
    .catch(() => {
      dispatch({ type: 'REMOVE_ITEM_FAILURE' });
    });
};

export const addItem = (itemType, itemContent) => (dispatch, getState) => {
  dispatch({ type: 'ADD_ITEM_REQUEST' });
  axios.post('http://localhost:1337/notes',
    {
      type: itemType,
      ...itemContent,
    },
    {
      headers: {
        Authorization:
          `Bearer ${getState().userID}`,
      },
    }).then(({ data }) => (
    dispatch({
      type: 'ADD_ITEM_SUCCESS',
      payload: {
        itemType,
        data,
      },
    })
  )).catch(() => {
    dispatch({ type: 'ADD_ITEM_FAILURE' });
  });
};
