type iconsName =
  | 'entradaSalida'
  | 'goceVacaciones'
  | 'horasExtras'
  | 'listaVacaciones'
  | 'pagoVacaciones'
  | 'salir'
  | 'vacaciones'
  | 'pruebaMesaDeTrabajo';

type imagesName = 'logo';

export const icons: Record<iconsName, number> = {
  entradaSalida: require('@icons/ICONOS-APP-Entrada-Salida.png'),
  goceVacaciones: require('@icons/ICONOS-APP-Goce-Vacaciones.png'),
  horasExtras: require('@icons/ICONOS-APP-Horas-Extras.png'),
  listaVacaciones: require('@icons/ICONOS-APP-Lista-Vacaciones.png'),
  pagoVacaciones: require('@icons/ICONOS-APP-Pago-Vacaciones.png'),
  salir: require('@icons/ICONOS-APP-Salir.png'),
  vacaciones: require('@icons/ICONOS-APP-Vacaciones.png'),
  pruebaMesaDeTrabajo: require('@icons/Prueba_Mesa_de_trabajo.png'),
};

export const images: Record<imagesName, number> = {
  logo: require('@images/LOGO-APP.png'),
};
