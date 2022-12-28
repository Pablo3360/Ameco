export function getEmpleadoresResponse(empleadores){
  return {
    type: 'GET_EMPLEADORES_RESPONSE',
    payload: empleadores
  }
};

export function getEmpleadores() {
  return function(dispatch) {
    fetch('http://localhost:3001/empleadores')
    .then(r => r.json())
    .then((empleadores) => dispatch(getEmpleadoresResponse(empleadores)))
    .catch( error => console.log(error))
  }
};

export function EmpleadorResponse(empleador){
  return {
    type: 'EMPLEADOR_RESPONSE',
    payload: empleador
  }
};

export function createEmpleador( fields, recaudadorId ){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/empleador/create/${recaudadorId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(fields)})
      .then(r => r.json())
      .then(empleador => dispatch(EmpleadorResponse(empleador)));
    } catch (error) {
      console.log(error.message)
    }
  }
};

export function updateEmpleador(updatedFields, empleadorId){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/empleador/update/${empleadorId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'PUT',
        body: JSON.stringify(updatedFields)})
      .then(r => r.json())
      .then(empleador => dispatch(EmpleadorResponse(empleador)));
    } catch (error) {
      console.log(error.message)
    }
  }
};
