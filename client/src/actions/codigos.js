export function getCodigosResponse(codigos){
  return {
    type: 'GET_CODIGOS_RESPONSE',
    payload: codigos
  }
};

export function getCodigos(grupoCodigoId) {

  let query = '';
  if(grupoCodigoId) query = `?grupoCodigoId=${grupoCodigoId}`;
  
  return function(dispatch) {
    fetch(`http://localhost:3001/codigos${query}`)
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

export function createCodigo( fields, grupoCodigoId ){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/codigo/create/${grupoCodigoId}`, {
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

