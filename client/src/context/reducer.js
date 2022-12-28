
const initialState = {
  afiliados: [],
  participantes: [],
  createdParticipante: {},
  recaudadores: [],
  createdRecaudador: {},
  empleadores: [],
  createdEmpleador: {},
  prestadores: [],
  createdPrestador: {},
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

  case 'GET_EMPLEADORES_RESPONSE':
    return {
      ...state,
      empleadores: action.payload
    }

  case 'EMPLEADOR_RESPONSE':
    return {
      ...state,
      createdEmpleador: action.payload
    }

  case 'GET_PRESTADORES_RESPONSE':
    return {
      ...state,
      prestadores: action.payload
    }

  case 'PRESTADOR_RESPONSE':
    return {
      ...state,
      createdPrestador: action.payload
    }

  default:
    return { ...state };
}
};

export default rootReducer;