//const urlBase = 'http://localhost:3001';
const urlBase = 'https://ameco-muestra.up.railway.app';

function Error(error){
  return {
    type: 'ERROR',
    payload: error
  }
};

const fetchData = async ({ url, method = 'GET', body = null }, dispatch ) => {
  const userLocalStore = JSON.parse(window.localStorage.getItem('user'));
  const headers = userLocalStore
    ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userLocalStore.token}` }
    : { 'Content-Type': 'application/json' };
  
  body = body ? { body: JSON.stringify(body) } : {};

  try {

    const response = await fetch( urlBase + url, { method, headers, ...body });
    if(response.status === 200) {
      return await response.json();
    } else {
      const error = await response.json();

      if(response.statusText === 'Unauthorized'){
        dispatch({
          type: 'USER_RESPONSE',
          payload: null,
        });
      }

      dispatch(Error(error));
      return;
    };

  } catch (error) {
    console.log(error);
    return;
  }
};

export default fetchData;