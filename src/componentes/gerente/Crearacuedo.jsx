import {
  doc,
  addDoc,
  collection,
} from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../../firebase";
import Dashboard from "./Dashboard";

const Crearacuerdo = () => {
  const [monto, setMonto] = useState("");
  const [anticipo, setAnticipo] = useState("");
  const [cotizacion, setCotizacion] = useState("");
  const [fecha, setFecha] = useState("");
  const [forma, setForma] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();


  const store = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(doc(db, "proyectos", id), "acuerdo"), {
        monto:monto,
        anticipo:anticipo,
        cotizacion:cotizacion,
        fecha: fecha,
        forma:forma,
      });
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
      <div className=" mt-12 ">
        <div className="w-full max-w-xl m-auto text-black ">
          <h2 className="text-center text-5xl font-bold mb-3">
            {" "}
            Crear Acuerdo Inicial:{" "}
          </h2>

          <form
            className="bg-gray-50 shadow-md rounded px-12 pt-8 pb-6 mb-6 mt-8"
            onSubmit={store}
          >
            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Monto Honorario:
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
                Anticipo:
              </label>
              <input
                type="text"
                value={anticipo}
                onChange={(e) => setAnticipo(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="10% / 20% / 30%"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Cotización:
              </label>
              <input
                type="text"
                value={cotizacion}
                onChange={(e) => setCotizacion(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="0000000"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Fecha:
              </label>
              <input
                type="text"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="dia-mes-año "
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Forma de pago:
              </label>
              <input
                type="text"
                value={forma}
                onChange={(e) => setForma(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Debito/Credito/especificar otro "
              />
            </div>
            <button className="bg-orange-400 hover:bg-orange-300 text-white  font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Crearacuerdo;
