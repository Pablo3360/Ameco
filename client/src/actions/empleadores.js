import fetchData from "./utils/fetchData";

export function getEmpleadoresResponse(empleadores){
  return {
    type: 'GET_EMPLEADORES_RESPONSE',
    payload: empleadores
  }
};

export function getEmpleadores() {
  return async function(dispatch) {
    const url = '/empleadores';
    const response = await fetchData({url}, dispatch);
    if(response){getEmpleadoresResponse(response)};
  }
};

export function EmpleadorResponse(empleador){
  return {
    type: 'EMPLEADOR_RESPONSE',
    payload: empleador
  }
};

export function createEmpleador( fields, recaudadorId ){
  return async function(dispatch){
    const url = `/empleador/create/${recaudadorId}`;
    const response = await fetchData({url, method:'POST', body: fields}, dispatch);
    if(response){EmpleadorResponse(response)};
  }
};

export function updateEmpleador(updatedFields, empleadorId){
  return async function(dispatch){
    const url = `/empleador/update/${empleadorId}`;
    const response = await fetchData({url, method:'PUT', body: updatedFields}, dispatch);
    if(response){EmpleadorResponse(response)};
  }
};
