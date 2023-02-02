import fetchData from "./utils/fetchData";

export function getParticipantesResponse(participantes){
  return {
    type: 'GET_PARTICIPANTES_RESPONSE',
    payload: participantes
  }
};

export function getParticipantes(titularId) {
  return async function(dispatch) {
    const url = `/participantes/${titularId}`;
    const response = await fetchData( { url }, dispatch );
    if(response) { dispatch(getParticipantesResponse(response)) };
  }
};

export function ParticipanteResponse(participante){
  return {
    type: 'PARTICIPANTE_RESPONSE',
    payload: participante
  }
};

export function createParticipante( fields, titularId){
  return async function(dispatch){
    const url = `/participante/create/${titularId}`;
    const response = await fetchData( { url, method: 'POST', body: fields }, dispatch );
    if( response ){ dispatch(ParticipanteResponse(response)) };
  }
};

export function updateParticipante(updatedFields, participanteId){
  return async function(dispatch){
    const url = `/participante/update/${participanteId}`;
    const response = await fetchData( { url, method: 'PUT', body: updatedFields} );
    if(response) { dispatch(ParticipanteResponse(response)) };
  }
};
