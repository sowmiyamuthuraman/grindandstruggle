/**
 * register action to create a user in the database
 * 
 * 
 * @param {Object} user - pass into backend to create a user in the DB
 * @param {Object} history - use to redirect to login page if successful
 */

export const RegisterAction = (user, history) => {
  return (dispatch, getState) => {
    console.log('attempting to register', user, history);
  };
};