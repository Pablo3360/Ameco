
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
  beneficios: [],
  createdBeneficio: {},
  codigos: [],
  createdCodigo: {},
  ordenes: [],
  createdOrden: {},
  gruposCodigos: [],
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

  case 'GET_BENEFICIOS_RESPONSE':
    return {
      ...state,
      beneficios: action.payload
    }

  case 'BENEFICIO_RESPONSE':
    return {
      ...state,
      createdBeneficio: action.payload
    }

  case 'GET_CODIGOS_RESPONSE':
    return {
      ...state,
      codigos: action.payload
    }

  case 'CODIGO_RESPONSE':
    return {
      ...state,
      createdCodigo: action.payload
    }

  case 'GET_GRUPOSCODIGOS_RESPONSE':
    return {
      ...state,
      gruposCodigos: action.payload
    }

  case 'GET_ORDENES_RESPONSE':
    return {
      ...state,
      ordenes: action.payload
    }

  case 'ORDEN_RESPONSE':
    return {
      ...state,
      createdOrden: action.payload
    }

  default:
    return { ...state };
}
};

export default rootReducer;