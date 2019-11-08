var initState = {
  authError: null
};

const authReducer = (state=initState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      console.log('register succesfully');
      return {
        ...state,
        authError: null
      }

    case 'REGISTER_ERROR':
      console.log('register error');
      return {
        ...state,
        authError: action.err
      }

    default:
      console.log('action does not exist');
      return state
  }
}

export default authReducer;