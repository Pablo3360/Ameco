const userLocalStore = JSON.parse(window.localStorage.getItem('user'));
const userInitialNull = {
  'id': null,
  'apellidos': null,
  'nombres': null,
  'token': null,
}

const initialState = {
  afiliados: [],
  deletedTitulares: false,
  titular: [],
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
  gruposCodigos: [],
  createdGrupoCodigo: {},
  codigos: [],
  createdCodigo: {},
  ordenes: [],
  recentOrdersPanales: [],
  recentOrdersLeche: [],
  createdOrden: {},
  lastEntrega: null,
  user: userLocalStore ? userLocalStore : userInitialNull,
  error: {},
  titularesPorSexo: {},
  titularesPorEdades: {},
  titularesPorTipos: {},
};
  
const rootReducer = function (state = initialState, action){
switch (action.type){
  case 'GET_AFILIADOS_RESPONSE':
    return {
      ...state,
      afiliados: action.payload
    }

  case 'DELETED_TITULARES':
    return {
      ...state,
      deletedTitulares: action.payload
    }

  case 'GET_TITULAR_RESPONSE':
    return {
      ...state,
      titular: action.payload
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

  case 'GET_GRUPOSCODIGOS_RESPONSE':
    return {
      ...state,
      gruposCodigos: action.payload
    }

  case 'GRUPOCODIGO_RESPONSE':
    return {
      ...state,
      createdGrupoCodigo: action.payload
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

  case 'GET_ORDENES_RESPONSE':
    return {
      ...state,
      ordenes: action.payload
    }

  case 'RECENT_ORDERS_PANALES':
    return {
      ...state,
      recentOrdersPanales: action.payload
  }

  case 'RECENT_ORDERS_LECHE':
    return {
      ...state,
      recentOrdersLeche: action.payload
  }

  case 'ORDEN_RESPONSE':
    return {
      ...state,
      createdOrden: action.payload
    }

  case 'ENTREGA_RESPONSE':
    return {
      ...state,
      lastEntrega: action.payload
  }

  case 'USER_RESPONSE':
    if(action.payload !== null){
      window.localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload
      }
    } else {
      window.localStorage.removeItem('user');
      return {
        ...state,
        user: userInitialNull
      }
    }

  case 'ERROR':
    return {
      ...state,
      error: action.payload
  }

  case 'TITULARES_SEXO':
    return {
      ...state,
      titularesPorSexo: action.payload
  }

  case 'TITULARES_EDADES':
    return {
      ...state,
      titularesPorEdades: action.payload
  }

  case 'TITULARES_TIPOS':
    return {
      ...state,
      titularesPorTipos: action.payload
  }

  default:
    return { ...state };
}
};

export default rootReducer;