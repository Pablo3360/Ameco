import fetchData from './utils/fetchData';

export function getAfiliadosResponse(afiliados){
  return {
    type: 'GET_AFILIADOS_RESPONSE',
    payload: afiliados
  }
};

export function getAfiliados() {
  return async function(dispatch) {
    const url = '/titulares';
    const response = await fetchData({ url }, dispatch);
    if(response){ dispatch(getAfiliadosResponse(response)) };
  }
};

export async function updateAfiliadoTitular(updatedFields, userId, dispatch){
  const url = `/titular/update/${userId}`;
  const response = await fetchData({ url, method: 'PUT', body: updatedFields }, dispatch);
  if(response){ return response };
};

export async function createAfiliadoTitular(data, dispatch){
  const url = '/titular/create';
  const response = await fetchData({ url, method: 'POST', body: data }, dispatch);
  if(response){ return response };
};

export function getTitularResponse(titular){
  return {
    type: 'GET_TITULAR_RESPONSE',
    payload: titular
  }
};

export function getTitular(titularId) {
  return async function(dispatch) {
    const url = `/titular/${titularId}`;
    const response = await fetchData({ url }, dispatch);
    if(response){ dispatch(getTitularResponse(response)) };
  }
};

export function deleteTitular(titularId) {
  return async function(dispatch) {
    const url = `/titular/${titularId}`;
    const response = await fetchData({ url, method: 'DELETE' }, dispatch);
    if(response){ dispatch(getAfiliados(dispatch)) };
  }
};