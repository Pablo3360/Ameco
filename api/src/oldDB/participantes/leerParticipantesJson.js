const participantesDbOld = require('./participantes.json');

module.exports =  function participantes(){ 
    
    let participantes = participantesDbOld[2].data.map( participante => {
    
    let obj = {};

    obj.id = participante.id;
    obj.dni = participante.dni;
    obj.apellidos = participante.apellidos;
    obj.nombres = participante.nombres;

    if(participante.relacion == 'Conyugue') obj.relacion = 'pareja';
    if(participante.relacion == 'Hijo/a') obj.relacion = 'hijo/a';

    obj.nacimiento = new Date(`${participante.fecha_nacimiento}T00:00:00`);
    if(obj.nacimiento == 'Invalid Date') obj.nacimiento = new Date('1990-01-01T00:00:00');

    if(participante.sexo == 'Masculino') obj.sexo = 'varon';
    if(participante.sexo == 'Femenino') obj.sexo = 'mujer';

    obj.titularId=parseInt(participante.id_titular);

    obj.created_at = new Date(`${participante.fecha_alta}`);
    if(obj.created_at == 'Invalid Date') obj.created_at = new Date('1990-01-01T00:00:00');
    
    //Agregar Create_at de la Base de datos vieja
    //Importante id empleador
    
    //NOTA: cuando se cargue los participantes, deben de existir su Titular en el db
    return obj;
    })

    return participantes;
};