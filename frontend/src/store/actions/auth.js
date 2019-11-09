import config from '../../config/config';

/**
 * register action to create a user in the database
 * 
 * 
 * @param {Object} user - pass into backend to create a user in the DB
 * @param {Object} history - use to redirect to login page if successful
 */

export const RegisterAction = (user, history) => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/register', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then((res) => {
      history.push('/login');
      dispatch({ type: 'REGISTER_SUCCESS' });
    })
    .catch(err => dispatch({ type: 'REGISTER_ERROR', err }));

  };
};