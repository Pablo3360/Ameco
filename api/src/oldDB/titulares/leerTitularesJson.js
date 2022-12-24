const titularesDbOld = require('./titulares.json');

module.exports =  function titulares(){ 
    
    let titulares = titularesDbOld[2].data.map( titular => {
    
    let obj = {};

    obj.id = titular.id;
    obj.dni = titular.dni;
    obj.apellidos = titular.apellidos;
    obj.nombres = titular.nombres;

    if(titular.tipo_socio == 'Activo') obj.tipo = 'activo';
    if(titular.tipo_socio == 'Adherente') obj.tipo = 'adherente';

    obj.domicilio = titular.domicilio;
    obj.localidad = titular.localidad;

    obj.nacimiento = new Date(`${titular.fecha_nacimiento}T00:00:00`);
    if(obj.nacimiento == 'Invalid Date') obj.nacimiento = new Date('1990-01-01T00:00:00');

    if(titular.sexo == 'Masculino') obj.sexo = 'varon';
    if(titular.sexo == 'Femenino') obj.sexo = 'mujer';
    if(titular.sexo == '') obj.sexo = 'sin especificar';

    if(titular.estado_civil === 'Casado/a') obj.estado_civil = 'casado/a';
    if(titular.estado_civil === 'Soltero/a') obj.estado_civil = 'soltero/a';
    if(titular.estado_civil === 'Union de hecho') obj.estado_civil = 'union de hecho';
    if(titular.estado_civil === 'Sin especificar') obj.estado_civil = 'sin especificar';

    obj.celular = titular.celular;
    
    //Agregar Create_at de la Base de datos vieja -> cuando se dio de alta en el sistema
    //Agregar cuando comenzo a trabajar en la empresa
    //Ver tabla "socio_empleador_ameco"
    //Importante id empleador
    
    return obj;
    })

    return titulares;
};