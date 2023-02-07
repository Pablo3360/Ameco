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