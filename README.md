# Sistema de Gestion para Mutual AMECO

La aplicación incluye autenticación de usuarios y las siguientes funcionalidades generales:

Acciones de Crear, Leer y Actualizar Afiliados, Empleadores, Recaudadores y Prestadores de servicios.

Los afiliados pueden ser Titulares o Participantes. Un Afiliado Titular puede tener muchos Afiliados Participantes vinculados.

Un Empleador debe tener un Recaudador vinculado y un Empleador puede tener muchos Afiliados Titulares.

Un Prestados puede ofrecer muchos beneficios. Cada Beneficios puede tener diferentes grupos de Codigos.

Un grupo de Codigo puede tener muchos codigos.

Un Afiliado, ya sea titular o partcipante se le puede otorgar diferentes beneficios.

Frontend: MUI, React, Redux. Backend: NodeJs, Express, Sequelize. Data Base: PostgreSQL.
