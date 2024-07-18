import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { collection, addDoc, doc } from "@firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate, useParams } from "react-router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Crearpago = () => {
  const [monto, setMonto] = useState(""); // Cambiado a cadena para manejar mejor la entrada
  const [descripcion, setDescripcion] = useState("");
  const [avance, setAvance] = useState("");
  const [fechai, setFechai] = useState(""); // Cambiado a cadena
  const [fechav, setFechav] = useState(""); // Cambiado a cadena
  const [impuesto, setImpuesto] = useState(""); // Cambiado a cadena para manejar mejor la entrada
  const [estado, setEstado] = useState("Pendiente");
  const [archivo, setArchivo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const estadosDePago = ["Pendiente", "Pagado"];

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const store = async (e) => {
    e.preventDefault();
    try {
      let archivoURL = "";
      if (archivo) {
        const uniqueFileName = `${uuidv4()}-${archivo.name}`;
        const storageRef = ref(storage, `proyectos/${id}/pagos/${uniqueFileName}`);
        const snapshot = await uploadBytes(storageRef, archivo);
        archivoURL = await getDownloadURL(snapshot.ref);
      }

      const fechaiDate = fechai ? new Date(fechai) : null;
      const fechavDate = fechav ? new Date(fechav) : null;

      await addDoc(collection(doc(db, "proyectos", id), "pago"), {
        monto: parseFloat(monto), // Convertir a número decimal
        descripcion: descripcion,
        avance: avance,
        fechai: fechaiDate,
        fechav: fechavDate,
        impuesto: parseFloat(impuesto), // Convertir a número decimal
        estado: estado,
        archivoURL: archivoURL
      });

      // Redirigir después de almacenar el avance
      navigate(`/Verdetalle/${id}`);
    } catch (error) {
      console.error("Error al almacenar el avance:", error);
    }
  };

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
      <div className=" mt-3 ">
        <div className="w-full max-w-xl m-auto text-black ">
          <h2 className="text-center text-5xl font-bold mb-3"> Crear Pago: </h2>

          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-6"
            onSubmit={store}
          >
            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Monto a cobrar:
              </label>
              <input
                type="text"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="00000000"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Descripción de cobro:
              </label>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ejemplo: pago cuota 1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Avance a realizar:
              </label>
              <input
                type="text"
                value={avance}
                onChange={(e) => setAvance(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ejemplo: realizar un corte"
              />
            </div>

            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Fecha de creación:
                </label>
                <input
                  type="date"
                  value={fechai}
                  onChange={(e) => setFechai(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Fecha de vencimiento:
                </label>
                <input
                  type="date"
                  value={fechav}
                  onChange={(e) => setFechav(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Impuesto a pagar:
              </label>
              <input
                type="text"
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

            <div className="mb-4">
              <label
                htmlFor="archivoPago"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Subir comprobante de pago:
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button className="bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Crearpago;
