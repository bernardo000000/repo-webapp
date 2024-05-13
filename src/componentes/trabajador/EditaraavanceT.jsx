import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../../firebase";
import Dashboard from "./DashboardT";
import { Link } from "react-router-dom";

const EditarAvanceT= () => {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();
  const { id, avanceId } = useParams(); // Supongamos que avanceId es el ID del avance que queremos editar

  const getAvance = async (id, avanceId) => {
    try {
      const avanceDocRef = doc(db, `proyectos/${id}/avance`, avanceId);
      const avanceData = await getDoc(avanceDocRef);
      if (avanceData.exists()) {
        const data = avanceData.data();
        setNombre(data.nombre);
        setFecha(data.fecha.toDate());
        setDescripcion(data.descripcion);
      } else {
        console.log("El avance no existe");
      }
    } catch (error) {
      console.error("Error al obtener el avance:", error);
    }
  };
  

  const handleUpdateAvance = async (e) => {
    e.preventDefault();
    try {
      const avanceDocRef = doc(db, `proyectos/${id}/avance`, avanceId);
      await updateDoc(avanceDocRef, {
        nombre: nombre,
        fecha: fecha,
        descripcion: descripcion,
      });
      console.log("Avance actualizado correctamente");
      navigate(`/VerdetalleT/${id}`);
    } catch (error) {
      console.error("Error al actualizar el avance:", error);
    }
  };
  
  useEffect(() => {
    getAvance(id,avanceId);
  }, []);

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
      <div className=" mt-6 ">
        <div className="w-full max-w-xl m-auto text-black ">
          <h2 className="text-center text-5xl font-bold mb-3">
            {" "}
            Editar Avance:{" "}
          </h2>

          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-6"
            onSubmit={handleUpdateAvance}
          >
            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre avance:
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ejemplo avance 1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Fecha avance:
              </label>
              <input
                type="date"
                value={fecha.toISOString().split("T")[0]} // Formatea la fecha en formato ISO
                onChange={(e) => setFecha(new Date(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="dia-mes-año "
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Descripción avance:
              </label>
              <textarea
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ejemplo: Se creo una vista"
              />
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

export default EditarAvanceT;
