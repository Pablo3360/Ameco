import fetchData from './utils/fetchData';

export function getRecaudadoresResponse(recaudadores){
  return {
    type: 'GET_RECAUDADORES_RESPONSE',
    payload: recaudadores
  }
};

export function getRecaudadores() {
  return async function(dispatch) {
    const url = '/recaudadores';
    const response = await fetchData({ url }, dispatch);
    if(response){dispatch(getRecaudadoresResponse(response))}
  }
};

export function RecaudadorResponse(recaudador){
  return {
    type: 'RECAUDADOR_RESPONSE',
    payload: recaudador
  }
};

export function createRecaudador( fields ){
  return async function(dispatch){
    const url = '/recaudador/create';
    const response = await fetchData({url, method:'POST', body: fields}, dispatch);
    if(response){dispatch(RecaudadorResponse(response))};
  }
};

export function updateRecaudador(updatedFields, recaudadorId){
  return async function(dispatch){
    const url = `/recaudador/update/${recaudadorId}`;
    const response = await fetchData({url, method:'PUT', body: updatedFields}, dispatch);
    if(response){dispatch(RecaudadorResponse(response))};
  }
};
