import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../../firebase";
import Dashboard from "./Dashboard";

const Editarpago = () => {
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [avance, setAvance] = useState("");
  const [fechaiOriginal, setFechaiOriginal] = useState(new Date()); // Almacena la fecha original
  const [fechavOriginal, setFechavOriginal] = useState(new Date()); // Almacena la fecha original
  const [fechai, setFechai] = useState(new Date());
  const [fechav, setFechav] = useState(new Date());
  const [impuesto, setImpuesto] = useState("");
  const [estado, setEstado] = useState("");
  const navigate = useNavigate();
  const { id, pagoId } = useParams();

  const update = async (e) => {
    e.preventDefault();
    try {
      const pagoDocRef = doc(db, `proyectos/${id}/pago`, pagoId);
      await updateDoc(pagoDocRef, {
        monto: monto,
        descripcion: descripcion,
        avance: avance,
        fechav: fechav,
        fechai: fechai,
        impuesto: impuesto,
        estado: estado,
      });
      console.log("Avance actualizado correctamente");
      navigate(`/Verdetalle/${id}`);
    } catch (error) {
      console.error("Error al actualizar el avance:", error);
    }
  };

  const getProductById = async (id, pagoId) => {
    try {
        const pagoDocRef = doc(db, `proyectos/${id}/pago`, pagoId);
        const pagoData = await getDoc(pagoDocRef);
        if (pagoData.exists()) {
            const dataso = pagoData.data();
            setMonto(dataso.monto);
            setDescripcion(dataso.descripcion);
            setAvance(dataso.avance);
            setFechaiOriginal(dataso.fechai.toDate()); // Actualiza la fecha original
            setFechavOriginal(dataso.fechav.toDate()); // Actualiza la fecha original
            setFechai(dataso.fechai.toDate());
            setFechav(dataso.fechav.toDate());
            setImpuesto(dataso.impuesto);
            setEstado(dataso.estado);
        } else {
            console.log("El avance no existe");
        }
    } catch (error) {
        console.error("Error al obtener el avance:", error);
    }
};

  useEffect(() => {
    getProductById(id,pagoId);
  }, []);

  const estadosDePago = ["Urgente", "Pendiente", "Completado"];

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
          <h2 className="text-center text-5xl font-bold mb-3">
            {" "}
            Editar Pago:{" "}
          </h2>

          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-6"
            onSubmit={update}
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
                Descripcion de cobro:
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
                placeholder="ejemplo:realizar un corte"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="fechai"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Fecha creacion pago:
              </label>
              <input
                type="date"
                value={fechaiOriginal.toISOString().split("T")[0]} // Utiliza la fecha original
                onChange={(e) => setFechai(new Date(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="dia-mes-año "
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="fechav"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Fecha de vencimiento pago:
              </label>
              <input
                type="date"
                value={fechavOriginal.toISOString().split("T")[0]} // Utiliza la fecha original
                onChange={(e) => setFechav(new Date(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="dia-mes-año "
              />
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
                placeholder="1000 "
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
            <button className="bg-orange-400 hover:bg-orange-300 text-white  font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
              Editar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editarpago;
