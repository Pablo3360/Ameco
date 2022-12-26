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

// export async function updateAfiliadoTitular(updatedFields, userId){
//   try {
//     let result = await fetch(`http://localhost:3001/afiliados/update/${userId}`, {
//       headers: {
//           'Content-Type': 'application/json'
//         },
//       method: 'PUT',
//       body: JSON.stringify(updatedFields)
//       }).then(r => r.json());
//     return result;
//   } catch (error) {
//     console.log(error.message)
//     return 0;
//   }
// };

export function createdParticipanteResponse(participante){
  return {
    type: 'CREATED_PARTICIPANTE_RESPONSE',
    payload: participante
  }
};

export function createParticipante( fields, titularId){
  return function(dispatch){
    try {
      fetch(`http://localhost:3001/participante/crear/${titularId}`, {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(fields)})
      .then(r => r.json())
      .then(participante => dispatch(createdParticipanteResponse(participante)));
    } catch (error) {
      console.log(error)
    }
  }
};
