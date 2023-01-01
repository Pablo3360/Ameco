export function getPrestadoresResponse(prestadores){
  return {
    type: 'GET_PRESTADORES_RESPONSE',
    payload: prestadores
  }
};

export function getPrestadores(beneficioId) {

  let query = '';
  if(beneficioId) query = `?beneficioId=${beneficioId}`;
  
  return function(dispatch) {
    fetch(`http://localhost:3001/prestadores${query}`)
    .then(r => r.json())
    .then((prestadores) => dispatch(getPrestadoresResponse(prestadores)))
    .catch( error => console.log(error))
  }
};

export function PrestadorResponse(prestador){
  return {
    type: 'PRESTADOR_RESPONSE',
    payload: prestador
  }
};

export function createPrestador( fields, beneficioId ){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/prestador/create/${beneficioId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(fields)})
      .then(r => r.json())
      .then(prestador => dispatch(PrestadorResponse(prestador)));
    } catch (error) {
      console.log(error.message)
    }
  }
};

export function updatePrestador(updatedFields, prestadorId){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/prestador/update/${prestadorId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'PUT',
        body: JSON.stringify(updatedFields)})
      .then(r => r.json())
      .then(prestador => dispatch(PrestadorResponse(prestador)));
    } catch (error) {
      console.log(error.message)
    }
  }
};
