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
    payload: lastEntrega.entrega
  }
};

export function getEntrega(titularId, beneficiarioId, grupoCodigoId) {
  return async function(dispatch) {
    const url = `/ordenes/entrega?titularId=${titularId}&&beneficiarioId=${beneficiarioId}&&grupoCodigoId=${grupoCodigoId}`;
    const response = await fetchData({url}, dispatch);
    if(response){dispatch(EntregaResponse(response))};
  }
};

export function getOrden(ordenId) {
  return async function(dispatch) {
    const url = `/orden/${ordenId}`;
    const response = await fetchData({url}, dispatch);
    if(response){dispatch(ordenResponse(response))};
  }
};

export function recentOrdersPanalesResponse(response){
  return {
    type: 'RECENT_ORDERS_PANALES',
    payload: response
  }
};

export function recentOrdersPanales() {
  return async function(dispatch) {
    const url = `/ordenes/panales`
    const response = await fetchData({url}, dispatch);
    if(response){dispatch(recentOrdersPanalesResponse(response))};
  }
}
