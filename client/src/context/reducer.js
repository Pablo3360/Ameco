
const initialState = {
  afiliados: [],
  createdAfiliadoTitular: [],
};
  
const rootReducer = function (state = initialState, action){
switch (action.type){
  case 'GET_AFILIADOS_RESPONSE':
    return {
      ...state,
      afiliados: action.payload
    }

  case 'CREATED_AFILIADO_TITULAR_RESPONSE':
    return {
      ...state,
      createdAfiliadoTitular: [ action.payload ]
    }

  default:
    return { ...state };
}
};

export default rootReducer;