
const initialState = {
  afiliados: [],
  createdAfiliadoTitular: [],
  participantes: [],
  createdParticipante: {},
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

  case 'GET_PARTICIPANTES_RESPONSE':
    return {
      ...state,
      participantes: action.payload
    }

  case 'CREATED_PARTICIPANTE_RESPONSE':
    return {
      ...state,
      createdParticipante: action.payload
    }

  default:
    return { ...state };
}
};

export default rootReducer;