// actualizarEstadosPagos.js

import { getDocs, getDoc, doc, updateDoc, collection } from 'firebase/firestore';
import { db } from "../firebase";

const ActualizarEstadosPagos = async () => {
  try {
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Obtener todos los pagos del día
    const pagosSnapshot = await getDocs(collection(db, 'pagos'));
    const pagos = pagosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Iterar sobre cada pago para verificar y actualizar su estado
    pagos.forEach(async pago => {
      // Verificar si el pago está vencido
      if (pago.fechaVencimiento.toDate() < fechaActual) {
        // Obtener el estado actual del proyecto asociado al pago
        const proyectoSnapshot = await getDoc(doc(db, `proyectos/${pago.idProyecto}`));
        const proyecto = proyectoSnapshot.data();

        // Verificar si el proyecto está en estado "Pausado" o "Activado"
        if (proyecto.estado === "Pausado" || proyecto.estado === "Activado") {
          // Actualizar el estado del pago a "Urgente"
          await updateDoc(doc(db, `pagos/${pago.id}`), { estado: "Urgente" });
          console.log(`El pago con ID ${pago.id} ha sido marcado como urgente.`);
        }
      }
    });
  } catch (error) {
    console.error('Error al actualizar los estados de los pagos:', error);
  }
};

export default ActualizarEstadosPagos;
