export function getParticipantesResponse(participantes){
  return {
    type: 'GET_PARTICIPANTES_RESPONSE',
    payload: participantes
  }
};

export function getParticipantes(titularId) {
  return function(dispatch) {
    fetch(`http://localhost:3001/participantes/${titularId}`)
    .then(r => r.json())
    .then((participantes) => dispatch(getParticipantesResponse(participantes)))
    .catch( error => console.log(error))
  }
};

export function ParticipanteResponse(participante){
  return {
    type: 'PARTICIPANTE_RESPONSE',
    payload: participante
  }
};

export function createParticipante( fields, titularId){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/participante/create/${titularId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(fields)})
      .then(r => r.json())
      .then(participante => dispatch(ParticipanteResponse(participante)));
    } catch (error) {
      console.log(error.message)
    }
  }
};

export function updateParticipante(updatedFields, participanteId){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/participante/update/${participanteId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'PUT',
        body: JSON.stringify(updatedFields)})
      .then(r => r.json())
      .then(participante => dispatch(ParticipanteResponse(participante)));
    } catch (error) {
      console.log(error.message)
    }
  }
};
