import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '../../../components/Table.js';
import { getTitularesPorTipos } from '../../../actions/statisticsTitulares';

export default function TitularesEnNumeros() {

  const dispatch = useDispatch();
  const titulares = useSelector( state => state.titularesPorTipos );

  useEffect(() => {
    if(!Object.keys(titulares).length) dispatch(getTitularesPorTipos());
    // eslint-disable-next-line
  }, []);

  if(!Object.keys(titulares).length){
    return('Cargando');
  } else {
    return (
      <Table 
        title={ 'Cantidad de Titulares y participantes'}
        head={ [ 'Tipo', 'Cantidad' ] }
        body={
          [ 
            [ 'Activos', titulares.activos ],
            [ 'Adherentes', titulares.adherentes ],
            [ 'Total Afiliados Titulares', titulares.activos + titulares.adherentes ],
            [ 'Conyuges', titulares.parejas ],
            [ 'Participantes (hijo/as y otros)', `${titulares.participantes} (<21 años)` ],
          ]
        }
      />
    );
  }
}
