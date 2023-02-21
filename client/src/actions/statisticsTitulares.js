import fetchData from './utils/fetchData';

export function getTitularesPorSexoResponse(titularesPorSexo){
  return {
    type: 'TITULARES_SEXO',
    payload: titularesPorSexo
  }
};

export function getTitularesPorSexo() {
  return async function(dispatch) {
    const url = '/statistics/titularesPorSexo';
    const response = await fetchData({ url }, dispatch);
    if(response){ dispatch(getTitularesPorSexoResponse(response)) };
  }
};

export function getTitularesPorEdadesResponse(titularesPorEdades){
  return {
    type: 'TITULARES_EDADES',
    payload: titularesPorEdades
  }
};

export function getTitularesPorEdades() {
  return async function(dispatch) {
    const url = '/statistics/titularesPorEdades';
    const response = await fetchData({ url }, dispatch);
    if(response){ dispatch(getTitularesPorEdadesResponse(response)) };
  }
};

export function getTitularesPorTiposResponse(titularesPorTipos){
  return {
    type: 'TITULARES_TIPOS',
    payload: titularesPorTipos
  }
};

export function getTitularesPorTipos() {
  return async function(dispatch) {
    const url = '/statistics/titularesPorTipos';
    const response = await fetchData({ url }, dispatch);
    if(response){ dispatch(getTitularesPorTiposResponse(response)) };
  }
};