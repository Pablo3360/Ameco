export function getPrestadoresResponse(prestadores){
  return {
    type: 'GET_PRESTADORES_RESPONSE',
    payload: prestadores
  }
};

export function getPrestadores() {
  return function(dispatch) {
    fetch('http://localhost:3001/prestadores')
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

export function createPrestador( fields ){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/prestador/create`, {
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
