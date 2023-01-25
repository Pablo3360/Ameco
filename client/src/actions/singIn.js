export function UserResponse(user){
  return {
    type: 'USER_RESPONSE',
    payload: user
  }
};

export function ErrorResponse(error){
  return {
    type: 'ERROR_RESPONSE',
    payload: error
  }
};

export function singIn(data) {
  return function(dispatch) {
    fetch('http://localhost:3001/singIn', {
      headers: {
          'Content-Type': 'application/json'
        },
      method: 'POST',
      body: JSON.stringify(data)
      })
    .then(r => r.json())
    .then( user => {
      // ver el Status Code 
      dispatch(UserResponse(user))
      dispatch(UserResponse(user))
    })
    .catch( error => console.log( error));
  }
};