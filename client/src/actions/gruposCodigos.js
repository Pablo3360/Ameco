export function getGruposCodigosResponse(gruposCodigos){
  return {
    type: 'GET_GRUPOSCODIGOS_RESPONSE',
    payload: gruposCodigos
  }
};

export function getGruposCodigos(beneficioId) {

  let query = '';
  if(beneficioId) query = `?beneficioId=${beneficioId}`;

  return function(dispatch) {
    fetch(`http://localhost:3001/gruposCodigos${query}`)
    .then(r => r.json())
    .then((gruposCodigos) => dispatch(getGruposCodigosResponse(gruposCodigos)))
    .catch( error => console.log(error))
  }
};

export function GrupoCodigoResponse(grupoCodigo){
  return {
    type: 'GRUPOCODIGO_RESPONSE',
    payload: grupoCodigo
  }
};

export function createGrupoCodigo( fields, beneficioId ){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/grupoCodigo/create/${beneficioId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(fields)})
      .then(r => r.json())
      .then(grupoCodigo => dispatch(GrupoCodigoResponse(grupoCodigo)));
    } catch (error) {
      console.log(error.message)
    }
  }
};

export function updateGrupoCodigo(updatedFields, grupoCodigoId){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/grupoCodigo/update/${grupoCodigoId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'PUT',
        body: JSON.stringify(updatedFields)})
      .then(r => r.json())
      .then(grupoCodigo => dispatch(GrupoCodigoResponse(grupoCodigo)));
    } catch (error) {
      console.log(error.message)
    }
  }
};
