import fetchData from "./utils/fetchData";

export function getGruposCodigosResponse(gruposCodigos){
  return {
    type: 'GET_GRUPOSCODIGOS_RESPONSE',
    payload: gruposCodigos
  }
};

export function getGruposCodigos(beneficioId) {
  return async function(dispatch) {
    const query = beneficioId ? `?beneficioId=${beneficioId}` : '';
    const url = `/gruposCodigos${query}`;
    const response = await fetchData({url}, dispatch);
    if(response){dispatch(getGruposCodigosResponse(response))};
  }
};

export function GrupoCodigoResponse(grupoCodigo){
  return {
    type: 'GRUPOCODIGO_RESPONSE',
    payload: grupoCodigo
  }
};

export function createGrupoCodigo( fields, beneficioId ){
  return async function(dispatch){
    const url = `/grupoCodigo/create/${beneficioId}`;
    const response = await fetchData({url, method: 'POST', body: fields})
    if(response){dispatch(GrupoCodigoResponse(response))};
  }
};

export function updateGrupoCodigo(updatedFields, grupoCodigoId){
  return async function(dispatch){
    const url = `/grupoCodigo/update/${grupoCodigoId}`;
    const response = await fetchData({url, method: 'PUT', body: updatedFields})
    if(response){dispatch(GrupoCodigoResponse(response))};
  }
};
