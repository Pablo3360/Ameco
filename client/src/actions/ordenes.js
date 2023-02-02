import fetchData from "./utils/fetchData";

export function getOrdenesResponse(ordenes){
  return {
    type: 'GET_ORDENES_RESPONSE',
    payload: ordenes
  }
};

export function getOrdenes() {
  return async function(dispatch) {
    const url = '/ordenes';
    const response = await fetchData({url}, dispatch);
    if(response){dispatch(getOrdenesResponse(response))};
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
    const url = '/orden/create';
    const response = await fetchData({url, method:'POST', body: data}, dispatch);
    if(response){dispatch(ordenResponse(response))};
  };
};

export function EntregaResponse(lastEntrega){
  return {
    type: 'ENTREGA_RESPONSE',
    payload: lastEntrega
  }
};

export function getEntrega(titularId, beneficiarioId, grupoCodigoId) {
  return async function(dispatch) {
    const url = `/ordenes/entrega?titularId=${titularId}&&beneficiarioId=${beneficiarioId}&&grupoCodigoId=${grupoCodigoId}`;
    const response = await fetchData({url}, dispatch);
    if(response){dispatch(EntregaResponse(response))};
  }
};
