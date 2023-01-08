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

export function ordenResponse(orden){
  return {
    type: 'ORDEN_RESPONSE',
    payload: orden
  }
};

export function createOrden(data){
  return async function(dispatch) {
    try {
      await fetch('http://localhost:3001/orden/create', {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(data)})
      .then(r => r.json())
      .then( orden => dispatch(ordenResponse(orden)));
    } catch (error) {
      console.log(error);
    }
  };
};

export function EntregaResponse(lastEntrega){
  return {
    type: 'ENTREGA_RESPONSE',
    payload: lastEntrega
  }
};

export function getEntrega(titularId, beneficiarioId, grupoCodigoId) {
  return function(dispatch) {
    fetch(`http://localhost:3001/ordenes/entrega?titularId=${titularId}&&beneficiarioId=${beneficiarioId}&&grupoCodigoId=${grupoCodigoId}`)
    .then(r => r.json())
    .then((lastEntrega) => { console.log(lastEntrega); dispatch(EntregaResponse(lastEntrega.entrega))})
    .catch( error => console.log(error))
  }
};
