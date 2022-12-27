
const initialState = {
  afiliados: [],
  participantes: [],
  createdParticipante: {},
  recaudadores: [],
  createdRecaudador: {},
};
  
const rootReducer = function (state = initialState, action){
switch (action.type){
  case 'GET_AFILIADOS_RESPONSE':
    return {
      ...state,
      afiliados: action.payload
    }

  case 'GET_PARTICIPANTES_RESPONSE':
    return {
      ...state,
      participantes: action.payload
    }

  case 'PARTICIPANTE_RESPONSE':
    return {
      ...state,
      createdParticipante: action.payload
    }

  case 'GET_RECAUDADORES_RESPONSE':
    return {
      ...state,
      recaudadores: action.payload
    }

  case 'RECAUDADOR_RESPONSE':
    return {
      ...state,
      createdRecaudador: action.payload
    }

  default:
    return { ...state };
}
};

export default rootReducer;