import axios from 'axios';

const defaultError = { status: '000', statusText: 'Server not responding', data: { message: [{ messages: [{ message: 'Server not responding' }] }] } };

export const authenticate = (identifier, password) => (dispatch) => {
  dispatch({ type: 'AUTHENTICATION_REQUEST' });

  return axios
    .post('http://localhost:1337/auth/local', {
      identifier,
      password,
    }).then((payload) => {
      dispatch({ type: 'AUTHENTICATION_SUCCESS', payload });
    })
    .catch(({ response = defaultError }) => {
      const errorData = response.data;
      dispatch({ type: 'AUTHENTICATION_FAILURE', errorData });
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
    .catch(({ response = defaultError }) => {
      const errorData = response.data;
      dispatch({ type: 'REGISTRATION_FAILURE', errorData });
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
          `Bearer ${getState().userJWT}`,
      },
      params: {
        userID: getState().userID,
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
    .catch(({ response = defaultError }) => {
      const errorData = {
        status: response.status,
        statusText: response.statusText,
      };
      dispatch({ type: 'FETCH_FAILURE', errorData });
    });
};

export const fetchSingleItem = (id) => (dispatch, getState) => {
  dispatch({ type: 'FETCH_ITEM_REQUEST' });

  return axios
    .get(`http://localhost:1337/notes/${id}`, {
      headers: {
        Authorization:
          `Bearer ${getState().userJWT}`,
      },
    })
    .then(({ data }) => {
      dispatch({
        type: 'FETCH_ITEM_SUCCESS',
        payload: data,
      });
    })
    .catch(({ response = defaultError }) => {
      const errorData = {
        status: response.status,
        statusText: response.statusText,
      };
      dispatch({ type: 'FETCH_ITEM_FAILURE', errorData });
    });
};

export const removeItem = (itemType, id) => (dispatch, getState) => {
  dispatch({ type: 'REMOVE_ITEM_REQUEST' });
  axios.delete(`http://localhost:1337/notes/${id}`, {
    headers: {
      Authorization:
        `Bearer ${getState().userJWT}`,
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
    .catch(({ response = defaultError }) => {
      const errorData = {
        status: response.status,
        statusText: response.statusText,
      };
      dispatch({ type: 'REMOVE_ITEM_FAILURE', errorData });
    });
};

export const addItem = (itemType, itemContent) => (dispatch, getState) => {
  dispatch({ type: 'ADD_ITEM_REQUEST' });
  axios.post('http://localhost:1337/notes',
    {
      userID: getState().userID,
      type: itemType,
      ...itemContent,
    },
    {
      headers: {
        Authorization:
          `Bearer ${getState().userJWT}`,
      },
    }).then(({ data }) => (
    dispatch({
      type: 'ADD_ITEM_SUCCESS',
      payload: {
        itemType,
        data,
      },
    })
  )).catch(({ response = defaultError }) => {
    const errorData = {
      status: response.status,
      statusText: response.statusText,
    };
    dispatch({ type: 'ADD_ITEM_FAILURE', errorData });
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' });
};

export const handleNewItemBarVisibility = () => (dispatch) => {
  dispatch({ type: 'HANDLE_NEW_ITEM_BAR_VISIBILITY' });
};
