import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { db, storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Dashboard from "./Dashboard";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from 'react-hot-toast';

const Editarpago = () => {
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [avance, setAvance] = useState("");
  const [fechaiOriginal, setFechaiOriginal] = useState(new Date());
  const [fechavOriginal, setFechavOriginal] = useState(new Date());
  const [fechai, setFechai] = useState(null);
  const [fechav, setFechav] = useState(null);
  const [impuesto, setImpuesto] = useState("");
  const [estado, setEstado] = useState("");
  const [archivoURL, setArchivoURL] = useState("");
  const [nuevoArchivo, setNuevoArchivo] = useState(null);
  const navigate = useNavigate();
  const { id, pagoId } = useParams();
  const [selectedEstado, setSelectedEstado] = useState("");

  const update = async (e) => {
    e.preventDefault();
    try {
      const pagoDocRef = doc(db, `proyectos/${id}/pago`, pagoId);

      // Preparar los datos para la actualización
      const updatedData = {
        monto,
        descripcion,
        avance,
        impuesto,
        estado,
      };

      if (fechai) {
        updatedData.fechai = fechai;
      }

      if (fechav) {
        updatedData.fechav = fechav;
      }

      if (nuevoArchivo) {
        // Eliminar el archivo existente si hay uno
        if (archivoURL) {
          const archivoRef = ref(storage, archivoURL);
          await deleteObject(archivoRef);
        }

        // Generar un nombre único para el nuevo archivo
        const uniqueFileName = `${uuidv4()}_${nuevoArchivo.name}`;
        const archivoRef = ref(
          storage,
          `proyectos/${id}/pagos/${uniqueFileName}`
        );

        // Subir el nuevo archivo
        await uploadBytes(archivoRef, nuevoArchivo);
        const archivoDownloadURL = await getDownloadURL(archivoRef);
        updatedData.archivoURL = archivoDownloadURL;
      }

      await updateDoc(pagoDocRef, updatedData);
      console.log("Pago actualizado correctamente");
      navigate(`/Verdetalle/${id}`);
    } catch (error) {
      console.error("Error al actualizar el pago:", error);
    }
  };

  const getProductById = async (id, pagoId) => {
    try {
      const pagoDocRef = doc(db, `proyectos/${id}/pago`, pagoId);
      const pagoData = await getDoc(pagoDocRef);
      const product = await getDoc(doc(db, "proyectos", id));
      const productData = await getDoc(product);
      const datito = productData.data();
      selectedEstado(datito.estado);
      selectedEstado();
      if (pagoData.exists()) {
        const dataso = pagoData.data();
        setMonto(dataso.monto);
        setDescripcion(dataso.descripcion);
        setAvance(dataso.avance);
        setFechaiOriginal(dataso.fechai.toDate());
        setFechavOriginal(dataso.fechav.toDate());
        setImpuesto(dataso.impuesto);
        setEstado(dataso.estado);
        setArchivoURL(dataso.archivoURL || "");
      } else {
        console.log("El pago no existe");
      }
    } catch (error) {
      console.error("Error al obtener el pago:", error);
    }
  };
  const handleEstadoChange = async (e) => {
    const nuevoEstado = e.target.value;
    setSelectedEstado(nuevoEstado);
    try {
      await updateDoc(doc(db, "proyectos", id), { estado: nuevoEstado });
      console.log("Estado del proyecto actualizado correctamente.");
      toast('Se actualizo el pago')
      
      setPageUpdated(true);
    } catch (error) {
      console.error("Error al actualizar el estado del proyecto:", error);
    }
  };

  useEffect(() => {
    getProductById(id, pagoId);
  }, [id, pagoId]);

  const estadosDePago = ["Pendiente", "Pagado"];
  const estadosProyecto = ["Activo", "Pausado","Terminado"];

  return (
    <div className="w-full">
      <Dashboard />
      <div className="absolute inset-4 -z-10 overflow-hidden mt-9">
        <svg
          className="absolute left-[max(50%,25rem)] top-2 h-[64rem] w-[128rem] -translate-x-1/2 stroke-orange-500 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-5} className="overflow-visible fill-gray-300">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={12}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mt-3">
        <div className="w-full max-w-xl m-auto text-black">
          <h2 className="text-center text-5xl font-bold mb-3">Editar Pago:</h2>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-6"
            onSubmit={update}
          >
            <div className="mb-4">
              <label
                htmlFor="monto"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Monto a cobrar:
              </label>
              <input
                type="text"
                id="monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="00000000"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="descripcion"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Descripción de cobro:
              </label>
              <input
                type="text"
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ejemplo: pago cuota 1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="avance"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Avance a realizar:
              </label>
              <input
                type="text"
                id="avance"
                value={avance}
                onChange={(e) => setAvance(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ejemplo: realizar un corte"
              />
            </div>

            <div className="mb-4 flex space-x-4">
              <div>
                <label
                  htmlFor="fechai"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Fecha creación pago:
                </label>
                <input
                  type="date"
                  id="fechai"
                  value={
                    fechai
                      ? fechai.toISOString().split("T")[0]
                      : fechaiOriginal.toISOString().split("T")[0]
                  }
                  onChange={(e) => setFechai(new Date(e.target.value))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="fechav"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Fecha de vencimiento pago:
                </label>
                <input
                  type="date"
                  id="fechav"
                  value={
                    fechav
                      ? fechav.toISOString().split("T")[0]
                      : fechavOriginal.toISOString().split("T")[0]
                  }
                  onChange={(e) => setFechav(new Date(e.target.value))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="impuesto"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Impuesto a pagar:
              </label>
              <input
                type="text"
                id="impuesto"
                value={impuesto}
                onChange={(e) => setImpuesto(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="1000"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="estadoPago"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Estado del pago:
              </label>
              <select
                id="estadoPago"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {estadosDePago.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>

            {archivoURL && (
              <div className="mb-4">
                <label
                  htmlFor="archivo"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Archivo actual:
                </label>
                <a
                  href={archivoURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Ver archivo
                </a>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="nuevoArchivo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Subir nuevo archivo:
              </label>
              <input
                type="file"
                id="nuevoArchivo"
                onChange={(e) => setNuevoArchivo(e.target.files[0])}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>


            <div className="mb-4">
              <label
                htmlFor="estadoPago"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Cambiar estado del Proyecto:
              </label>
              <select
                id="estadoProyecto"
                value={selectedEstado}
                onChange={handleEstadoChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {estadosProyecto.map((estadoP) => (
                  <option key={estadoP} value={estadoP}>
                    {estadoP}
                  </option>
                ))}
              </select>
            </div>

            <button className="bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
              Editar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editarpago;
