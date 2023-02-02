import fetchData from "./utils/fetchData";

export function UserResponse(user){
  return {
    type: 'USER_RESPONSE',
    payload: user,
  }
};

export function LogIn(data) {
  return async function(dispatch) {
    const url = '/login';
    const response = await fetchData({ url, method:'POST', body: data}, dispatch);
    if(response){dispatch(UserResponse(response))};
  }
};