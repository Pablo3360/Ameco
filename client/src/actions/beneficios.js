import fetchData from "./utils/fetchData";

export function getBeneficiosResponse(beneficios){
  return {
    type: 'GET_BENEFICIOS_RESPONSE',
    payload: beneficios
  }
};

export function getBeneficios() {
  return async function(dispatch) {
    const url = '/beneficios';
    const response = await fetchData({url}, dispatch);
    if(response){dispatch(getBeneficiosResponse(response))};
  }
};

export function BeneficioResponse(beneficio){
  return {
    type: 'BENEFICIO_RESPONSE',
    payload: beneficio
  }
};

export function createBeneficio( fields ){
  return async function(dispatch){
    const url = '/beneficio/create';
    const response = await fetchData({url, method: 'POST', body: fields}, dispatch);
    if(response){dispatch(BeneficioResponse(response))};
  }
};

export function updateBeneficio(updatedFields, beneficioId){
  return async function(dispatch){
    const url = `/beneficio/update/${beneficioId}`;
    const response = await fetchData({url, method: 'PUT', body: updatedFields}, dispatch);
    if(response){dispatch(BeneficioResponse(response))};
  }
};
