export function getBeneficiosResponse(beneficios){
  return {
    type: 'GET_BENEFICIOS_RESPONSE',
    payload: beneficios
  }
};

export function getBeneficios() {
  return function(dispatch) {
    fetch('http://localhost:3001/beneficios')
    .then(r => r.json())
    .then((beneficios) => dispatch(getBeneficiosResponse(beneficios)))
    .catch( error => console.log(error))
  }
};

export function BeneficioResponse(beneficio){
  return {
    type: 'BENEFICIO_RESPONSE',
    payload: beneficio
  }
};

export function createBeneficio( fields ){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/beneficio/create`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(fields)})
      .then(r => r.json())
      .then(beneficio => dispatch(BeneficioResponse(beneficio)));
    } catch (error) {
      console.log(error.message)
    }
  }
};

export function updateBeneficio(updatedFields, beneficioId){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/beneficio/update/${beneficioId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'PUT',
        body: JSON.stringify(updatedFields)})
      .then(r => r.json())
      .then(beneficio => dispatch(BeneficioResponse(beneficio)));
    } catch (error) {
      console.log(error.message)
    }
  }
};
