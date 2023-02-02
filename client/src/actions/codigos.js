import fetchData from "./utils/fetchData";

export function getCodigosResponse(codigos){
  return {
    type: 'GET_CODIGOS_RESPONSE',
    payload: codigos
  }
};

export function getCodigos(grupoCodigoId) {
  return async function(dispatch) {
    const query = grupoCodigoId ? `?grupoCodigoId=${grupoCodigoId}` : '';
    const url = `/codigos${query}`;
    const response = await fetchData({url}, dispatch);
    if(response){dispatch(getCodigosResponse(response))};
  }
};

export function CodigoResponse(codigo){
  return {
    type: 'CODIGO_RESPONSE',
    payload: codigo
  }
};

export function createCodigo( fields, grupoCodigoId ){
  return async function(dispatch){
    const url = `/codigo/create/${grupoCodigoId}`;
    const response = await fetchData({url, method:'POST', body: fields}, dispatch);
    if(response){dispatch(CodigoResponse(response))};
  }
};

export function updateCodigo(updatedFields, codigoId){
  return async function(dispatch){
    const url = `/codigo/update/${codigoId}`;
    const response = await fetchData({url, method:'PUT', body: updatedFields}, dispatch);
    if(response){dispatch(CodigoResponse(response))};
  }
};

