export function getCodigosResponse(codigos){
  return {
    type: 'GET_CODIGOS_RESPONSE',
    payload: codigos
  }
};

export function getCodigos() {
  return function(dispatch) {
    fetch('http://localhost:3001/codigos')
    .then(r => r.json())
    .then((codigos) => dispatch(getCodigosResponse(codigos)))
    .catch( error => console.log(error))
  }
};

export function CodigoResponse(codigo){
  return {
    type: 'CODIGO_RESPONSE',
    payload: codigo
  }
};

export function createCodigo( fields, beneficioId ){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/codigo/create/${beneficioId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(fields)})
      .then(r => r.json())
      .then(codigo => dispatch(CodigoResponse(codigo)));
    } catch (error) {
      console.log(error.message)
    }
  }
};

export function updateCodigo(updatedFields, codigoId){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/codigo/update/${codigoId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'PUT',
        body: JSON.stringify(updatedFields)})
      .then(r => r.json())
      .then(codigo => dispatch(CodigoResponse(codigo)));
    } catch (error) {
      console.log(error.message)
    }
  }
};

export function getGruposCodigosResponse(gruposCodigos){
  return {
    type: 'GET_GRUPOSCODIGOS_RESPONSE',
    payload: gruposCodigos
  }
};

export function getGruposCodigos() {
  return function(dispatch) {
    fetch('http://localhost:3001/gruposcodigos')
    .then(r => r.json())
    .then((gruposCodigos) => dispatch(getGruposCodigosResponse(gruposCodigos)))
    .catch( error => console.log(error))
  }
};
