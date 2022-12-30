export function getOrdenesResponse(ordenes){
  return {
    type: 'GET_ORDENES_RESPONSE',
    payload: ordenes
  }
};

export function getOrdenes() {
  return function(dispatch) {
    fetch('http://localhost:3001/ordenes')
    .then(r => r.json())
    .then((ordenes) => dispatch(getOrdenesResponse(ordenes)))
    .catch( error => console.log(error))
  }
};

export async function createOrden(data){
  try {
    let result = await fetch('http://localhost:3001/orden/create', {
      headers: {
          'Content-Type': 'application/json'
        },
      method: 'POST',
      body: JSON.stringify(data)})
    .then(r => r.json());
    return result;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
