import { Error } from './error';

export function UserResponse(user){
  return {
    type: 'USER_RESPONSE',
    payload: user
  }
};

export function singIn(data) {
  return async function(dispatch) {
    dispatch(UserResponse({}));
    try {
      const r = await fetch('http://localhost:3001/singIn', {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(data)
        });
      
      if(r.status === 200) {
        const res = await r.json();
        dispatch(UserResponse(res));
      } else {
        const res = await r.json();
        dispatch(Error(res));
      };
    } catch (error) {
      console.log(error);
    }
  }
};