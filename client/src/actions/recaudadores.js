export function getRecaudadoresResponse(recaudadores){
  return {
    type: 'GET_RECAUDADORES_RESPONSE',
    payload: recaudadores
  }
};

export function getRecaudadores() {
  return function(dispatch) {
    fetch('http://localhost:3001/recaudadores')
    .then(r => r.json())
    .then((recaudadores) => dispatch(getRecaudadoresResponse(recaudadores)))
    .catch( error => console.log(error))
  }
};

export function RecaudadorResponse(recaudador){
  return {
    type: 'RECAUDADOR_RESPONSE',
    payload: recaudador
  }
};

export function createRecaudador( fields ){
  return function(dispatch){
    try {
      fetch('http://localhost:3001/recaudador/create', {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(fields)})
      .then(r => r.json())
      .then(recaudador => dispatch(RecaudadorResponse(recaudador)));
    } catch (error) {
      console.log(error.message)
    }
  }
};

export function updateRecaudador(updatedFields, recaudadorId){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/recaudador/update/${recaudadorId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'PUT',
        body: JSON.stringify(updatedFields)})
      .then(r => r.json())
      .then(recaudador => dispatch(RecaudadorResponse(recaudador)));
    } catch (error) {
      console.log(error.message)
    }
  }
};
