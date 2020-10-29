import axios from 'axios';

export const authenticate = (username, password) => (dispatch) => {
  dispatch({ type: 'AUTHENTICATION_REQUEST' });

  return axios
    .post('http://localhost:9000/api/user/login', {
      username,
      password,
    }).then((payload) => {
      dispatch({ type: 'AUTHENTICATION_SUCCESS', payload });
    })
    .catch(() => {
      dispatch({ type: 'AUTHENTICATION_FAILURE' });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT_REQUEST' });

  return axios
    .post('http://localhost:9000/api/user/logout')
    .then(
      dispatch({ type: 'LOGOUT_SUCCESS' }),
    )
    .catch(
      dispatch({ type: 'LOGOUT_FAILURE' }),
    );
};

export const fetchItems = (itemType) => (dispatch, getState) => {
  dispatch({ type: 'FETCH_REQUEST' });

  return axios
    .get('http://localhost:9000/api/notes/type', {
      params: {
        type: itemType,
        userID: getState().userID,
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

export const removeItem = (itemType, id) => (dispatch) => {
  dispatch({ type: 'REMOVE_ITEM_REQUEST' });
  axios.delete(`http://localhost:9000/api/note/${id}`).then(() => (
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

  axios.post('http://localhost:9000/api/note', {
    userID: getState().userID,
    type: itemType,
    ...itemContent,
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
