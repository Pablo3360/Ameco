import fetchData from "./utils/fetchData";

export function getPrestadoresResponse(prestadores){
  return {
    type: 'GET_PRESTADORES_RESPONSE',
    payload: prestadores
  }
};

export function getPrestadores() {
  return async function(dispatch) {
    const url = '/prestadores';
    const response = await fetchData({url}, dispatch);
    if(response){dispatch(getPrestadoresResponse(response))}
  }
};

export function PrestadorResponse(prestador){
  return {
    type: 'PRESTADOR_RESPONSE',
    payload: prestador
  }
};

export function createPrestador( fields ){
  return async function(dispatch){
    const url = '/prestador/create';
    const response = await fetchData({url, method:'POST', body: fields}, dispatch);
    if(response){dispatch(PrestadorResponse(response))};
  }
};

export function updatePrestador(updatedFields, prestadorId){
  return async function(dispatch){
    const url = `/prestador/update/${prestadorId}`;
    const response = await fetchData({url, method:'PUT', body: updatedFields}, dispatch);
    if(response){dispatch(PrestadorResponse(response))};
  }
};

export function getPrestadoresBeficioId(beneficioId) {
  return async function(dispatch) {
    const url = `/prestadores/${beneficioId}`;
    const response = await fetchData({url}, dispatch);
    if(response){dispatch(getPrestadoresResponse(response))};
  }
};
