
export function validate(value, inputName) {
  let error = '';
  switch (inputName) {
    case 'nombres':
      if (!/^[A-Z\s]*$/i.test(value)) {
        error = 'Invalido (solo letras)';
      } else {
        error = '';
      }
      return error;

    case 'apellidos':
      if (!/^[A-Z\s]*$/i.test(value)) {
          error = 'Invalido (solo letras)';
      } else {
          error = '';
      }
      return error;
    
    case 'dni': 
      if (!/^[\d]*$/i.test(value)) {
        error = 'Invalido (solo números)';
      } else {
        error = '';
      }
      return error;

    case 'nacimiento': 
      return error = '';

    case 'localidad': 
      return error = '';

    case 'celular': 
      return error = '';

    default: 
      return error='';
  };
};

  
// *: 0 o más ocurrencias del caracter anterior.
// +: 1 o más ocurrencias del caracter anterior.
// \d: dígitos ([0-9])
// i: no distingue entre mayúsculas y minúsculas.
