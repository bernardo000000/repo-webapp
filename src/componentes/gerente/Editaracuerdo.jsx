import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Dashboard from "./Dashboard";

const Editaracuerdo = () => {
  const [monto, setMonto] = useState("");
  const [anticipo, setAnticipo] = useState("");
  const [cotizacion, setCotizacion] = useState("");
  const [fecha, setFecha] = useState("");
  const [forma, setForma] = useState("");

  const navigate = useNavigate();
  const { id , acuerdoId} = useParams();
  

  useEffect(() => {
    const getAcuerdo = async () => {
      try {
        const acuerdoDocRef = doc(db, `proyectos/${id}/acuerdo`, acuerdoId);
        const acuerdoData = await getDoc(acuerdoDocRef);
        if (acuerdoData.exists()) {
          const data = acuerdoData.data();
          setAnticipo(data.anticipo);
          setForma(data.forma);
          setMonto(data.monto);
          setFecha(data.fecha);
          setCotizacion(data.cotizacion);
        } else {
          console.log("El acuerdo no existe");
        }
      } catch (error) {
        console.error("Error al obtener el acuerdo:", error);
      }
    };

    getAcuerdo(id,acuerdoId);
  }, [id,acuerdoId]);

  const update = async (e) => {
    e.preventDefault();
    try {
      const avanceDocRef = doc(db, `proyectos/${id}/acuerdo`, acuerdoId);
      await updateDoc(avanceDocRef, {
        monto:monto,
        anticipo:anticipo,
        cotizacion:cotizacion,
        fecha: fecha,
        forma:forma,
      });
      console.log("Avance actualizado correctamente");
      navigate(`/Verdetalle/${id}`);
    } catch (error) {
      console.error("Error al actualizar el avance:", error);
    }
  };
  
  return (
    <div className="w-full">
      <Dashboard />
      <div className=" mt-12 ">
        <div className="w-full max-w-xl m-auto text-black ">
          <h2 className="text-center text-5xl font-bold mb-3">
            {" "}
            Editar Acuerdo Inicial:{" "}
          </h2>

          <form
            className="bg-white shadow-lg rounded px-8 pt-6 pb-6 mb-6 mt-8"
            onSubmit={update}
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
              Editar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editaracuerdo;

