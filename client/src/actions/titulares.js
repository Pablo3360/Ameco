import { Error } from './error';

export function getAfiliadosResponse(afiliados){
  return {
    type: 'GET_AFILIADOS_RESPONSE',
    payload: afiliados
  }
};

export function getAfiliados(token) {
  return function(dispatch) {
    fetch('http://localhost:3001/titulares', {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
    .then( async r => {
      if(r.status === 200) {
        const afiliados = await r.json();
        dispatch(getAfiliadosResponse(afiliados));
      } else {
        const error = await r.json();
        dispatch(Error(error));
      }
    })
    .catch( error => console.log(error) );
  }
};

export async function updateAfiliadoTitular(updatedFields, userId){
  try {
    let result = await fetch(`http://localhost:3001/titular/update/${userId}`, {
      headers: {
          'Content-Type': 'application/json'
        },
      method: 'PUT',
      body: JSON.stringify(updatedFields)
      }).then(r => r.json());
    return result;
  } catch (error) {
    console.log(error.message)
    return null;
  }
};

export async function createAfiliadoTitular(data){
  try {
    let result = await fetch('http://localhost:3001/titular/create', {
      headers: {
          'Content-Type': 'application/json'
        },
      method: 'POST',
      body: JSON.stringify(data)})
    .then(r => r.json());
    return result;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export function getTitularResponse(titular){
  return {
    type: 'GET_TITULAR_RESPONSE',
    payload: titular
  }
};

export function getTitular(titularId) {
  return function(dispatch) {
    fetch(`http://localhost:3001/titular/${titularId}`)
    .then(r => r.json())
    .then((titular) => dispatch(getTitularResponse(titular)))
    .catch( error => console.log(error))
  }
};
