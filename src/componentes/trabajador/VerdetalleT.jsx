import {
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../../firebase";
import Dashboard from "./DashboardT";
import { Link } from "react-router-dom";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";

const Verdetalle = () => {
  const [proyecto, setProyecto] = useState("");
  const [cliente, setCliente] = useState("");
  const [pagos, setPagos] = useState([]);
  const [avance, setAvance] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState(proyecto.estado);

  const navigate = useNavigate();
  const { id } = useParams();

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "proyectos", id));
    if (product.exists()) {
      setProyecto(product.data());
      const proyectosCliente = await getDocs(collection(db, "clientes"));
      const proyectoCliente = proyectosCliente.docs.find(
        (doc) => doc.data().nombre === product.data().cliente
      );
      if (proyectoCliente) {
        setCliente(proyectoCliente.data());
      } else {
        console.log("El cliente asociado al cliente no existe");
      }
    } else {
      console.log("El producto no existe");
    }
  };

  useEffect(() => {
    const getPagosById = async () => {
      const proyectosPagos = await getDocs(
        collection(db, `proyectos/${id}/pago`)
      );
      const PagosProyecto = proyectosPagos.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPagos(PagosProyecto);
    };

    getPagosById();
  }, [pagos]);

  useEffect(() => {
    const getAvanceById = async () => {
      const proyectosAvance = await getDocs(
        collection(db, `proyectos/${id}/avance`)
      );
      const avancesProyecto = proyectosAvance.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAvance(avancesProyecto);
    };

    getAvanceById();
  }, [avance]);

  useEffect(() => {
    getProductById(id);
    
  }, []);

  const deleteAvance = async (idProyecto, avanceId) => {
    try {
      // Eliminar el documento de avance específico
      await deleteDoc(doc(db, `proyectos/${idProyecto}/avance/${avanceId}`));
  
      // Actualizar el estado de avance eliminando el avance específico
      setAvance(avance => avance.filter(avance => avance.id !== avanceId));
  
      console.log("Avance eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el avance:", error);
    }
  };
  
  

// Uso: eliminarColeccionAnidada('coleccion_padre', 'id_padre', 'coleccion_hija');


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
      <div className="flex justify-between px-4 py-4">
        <h2 className="text-4xl font-bold">Detalles {proyecto.nombre}</h2>
      </div>

      {/* Detalles del Proyecto */}
      <div className="container py-3">
        <div className="row justify-content-center">
          {/* Detalles del Proyecto */}
          <div className="col-md-10">
            <div className="text-black">
              <form
                className="bg-white shadow-md rounded px-3 pt-3 pb-3 mb-2 "
                style={{ border: "3px solid orange" }}
              >
                <div className="grid grid-cols-3 gap-x-2">
                  {/* Datos del Proyecto */}
                  <div>
                    <h2 className="text-center text-2xl font-bold mb-2 text-orange-500">
                      Datos Proyecto:
                    </h2>
                    <div className="mb-1 text-center">
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-xl mb-1"
                      >
                        Rol: {proyecto.rol}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-xl mb-1"
                      >
                        Cliente: {proyecto.cliente}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-xl mb-1"
                      >
                        Municipalidad: {proyecto.municipalidad}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-xl mb-1"
                      >
                        Dirección: {proyecto.direccion}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-xl mb-1"
                      >
                        Tipo de proyecto: {proyecto.tipo}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-xl mb-1"
                      >
                        Estado: {proyecto.estado}
                      </label>
                    </div>
                  </div>
                  {/* Datos del Cliente */}
                  <div>
                    <h2 className="text-center text-2xl font-bold mb-2 text-orange-500">
                      Datos Cliente:
                    </h2>
                    <div className="mb-2 text-center">
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-xl mb-1"
                      >
                        Rut: {cliente.rut}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-xl mb-1"
                      >
                        Email: {cliente.email}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-xl mb-1"
                      >
                        Teléfono: {cliente.telefono}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-xl mb-1"
                      >
                        Representante legal: {cliente.relegals}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-xl mb-1"
                      >
                        Datos factura: {cliente.datosfacturacion}
                      </label>
                    </div>
                  </div>
                  {/* Descripcion extra del proyecto */}
                  <div>
                    <h2 className="text-center text-2xl font-bold mb-2 text-orange-500">
                      Datos extras del proyecto:
                    </h2>
                    <div className="mb-1 text-center">
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-xl mb-1"
                      >
                        {proyecto.descripcion}
                      </label>
                      <Link
                      to={`/ExtraT/${id}`} // Aquí se incluyen ambos parámetros
                      className="text-orange-500 hover:text-orange-300 text-md py-2 px-2"
                    >
                      Editar
                    </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Detalles del Pagos y avances  */}

      <div className="container-fluid px-8">
        <div className="row">
          <div className="col-md-12">
            <div className="flex justify-between items-center px-4 mb-3">
              <h2 className="text-3xl font-semibold">Pagos</h2>
            </div>
            <div className="d-flex flex-wrap px-4 py-2">
              {pagos.map((pago) => (
                <div
                  key={pago.id}
                  className="bg-white p-3 shadow-md rounded mb-2 mr-2"
                  style={{ maxWidth: "220px", border: "3px solid orange" }}
                >
                  <p className="font-bold text-lg">Fecha vencimiento: </p>
                  <p className="font-semibold text-sm">
                    {pago.fechav.toDate().toLocaleDateString()}
                  </p>
                  <p className="font-bold text-lg">Avance a tener:</p>
                  <p className="font-semibold text-sm"> {pago.avance}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-12">
            <div className="flex justify-between items-center  px-4 mb-4">
              <h2 className="text-3xl font-semibold">Avance Internos</h2>
              <button className=" bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <Link to={`/CrearavanceT/${id}`} className="flex items-center">
                  <PlusIcon className="w-6 h-6" />
                  Avances
                </Link>
              </button>
            </div>
            <div className="d-flex flex-wrap px-4 ">
              {avance.map((avance) => (
                <div
                  key={avance.id}
                  className="bg-white p-3 shadow-md rounded mb-2 mr-2"
                  style={{ maxWidth: "220px", border: "3px solid orange" }}
                >
                  <p className="font-bold text-lg">Nombre Avance:</p>
                  <p className="font-semibold text-sm">{avance.nombre}</p>
                  <p className="font-bold text-lg">Fecha Avance: </p>
                  <p className="font-semibold text-sm">
                    {avance.fecha.toDate().toLocaleDateString()}
                  </p>
                  <p className="font-bold text-lg ">Descripción:</p>
                  <p className="font-semibold text-sm"> {avance.descripcion}</p>
                  <div className="d-flex justify-content-end mt-1">
                    <Link
                      to={`/EditaravanceT/${id}/${avance.id}`} // Aquí se incluyen ambos parámetros
                      className="text-orange-500 hover:text-orange-300 text-md py-2 px-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteAvance(id,avance.id)}
                      className="text-red-700 hover:text-red-500 py-2 px-2 focus:outline-none focus:shadow-outline"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verdetalle;
