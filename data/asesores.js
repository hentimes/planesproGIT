// planespro/data/asesores.js

export const asesoresData = [
  {
    id: 'henry-farias',
    nombre: 'Henry Farías',
    cargo: 'Asesor Senior de Salud y Previsión',
    foto: 'assets/avatares/asesores/henry-farias.jpg', // Ruta corregida
    certificacion: true, 
    biografia: 'Con más de 10 años de experiencia en el sector, mi misión es encontrar el equilibrio perfecto entre cobertura y costo para mis clientes. Creo en la asesoría honesta: si Fonasa es tu mejor opción, seré el primero en decírtelo.',
    especialidades: [
      'Optimización de planes para familias',
      'Análisis de cobertura hospitalaria',
      'Asesoría para trabajadores independientes',
      'Evaluación de cambio de AFP'
    ],
    testimonio: {
      cita: 'Gracias a Henry optimicé mi plan y ahora pago mucho menos. Su honestidad es única.',
      autor: 'Patricio González'
    }
  },
  {
    id: 'maria-paz',
    nombre: 'María Paz Rodriguez',
    cargo: 'Especialista en Planes Individuales',
    foto: 'assets/avatares/asesores/maria-paz.jpg', // Ruta corregida
    certificacion: true,
    biografia: 'Me especializo en guiar a profesionales jóvenes y futuros padres a través del complejo mundo de las Isapres. Mi objetivo es que tomes decisiones informadas que te den tranquilidad hoy y en el futuro.',
    especialidades: [
      'Planes con cobertura de maternidad',
      'Primera afiliación a Isapre',
      'Cobertura de enfermedades preexistentes',
      'Planes para jóvenes profesionales'
    ],
    testimonio: {
      cita: 'Nos ayudó a entender las diferencias y elegimos un plan perfecto para nuestra familia.',
      autor: 'Sofía Pérez'
    }
  }
  // Para añadir un nuevo asesor, copia y pega una "ficha" como las de arriba aquí.
];