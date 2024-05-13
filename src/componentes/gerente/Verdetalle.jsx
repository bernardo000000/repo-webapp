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
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import DescargarPDF from "./DescargarPdf";
import ActualizarEstadosPagos  from '/src/componentes/ActualizarEstadosPagos.jsx';

// Resto del código de Verdetalle.jsx...


const Verdetalle = () => {
  const [proyecto, setProyecto] = useState("");
  const [cliente, setCliente] = useState("");
  const [acuerdo, setAcuerdo] = useState("");
  const [pagos, setPagos] = useState([]);
  const [avance, setAvance] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState("");
  const [pageUpdated, setPageUpdated] = useState(false); // Nuevo estado para controlar si la página se ha actualizado

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async (id) => {
      const product = await getDoc(doc(db, "proyectos", id));
      if (product.exists()) {
        const fetchedProyecto = product.data();
        setProyecto(fetchedProyecto);
        ActualizarEstadosPagos();

        const proyectoAcuerdoSnapshot = await getDocs(
          collection(db, `proyectos/${id}/acuerdo`)
        );
        if (!proyectoAcuerdoSnapshot.empty) {
          const acuerdoProyecto = proyectoAcuerdoSnapshot.docs[0].data(); // Acceder al primer documento y obtener sus datos
          const acuerdoConId = {
            id: proyectoAcuerdoSnapshot.docs[0].id,
            ...acuerdoProyecto,
          }; // Agregar el ID al objeto del acuerdo
          setAcuerdo(acuerdoConId);
        } else {
          console.log("El acuerdo asociado al proyecto no existe");
        }

        const proyectosCliente = await getDocs(collection(db, "clientes"));
        const proyectoCliente = proyectosCliente.docs.find(
          (doc) => doc.data().nombre === fetchedProyecto.cliente
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

    getProductById(id);
  }, [id]);

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
  const deletePago = async (idProyecto, pagoId) => {
    try {
      // Eliminar el documento de avance específico
      await deleteDoc(doc(db, `proyectos/${idProyecto}/pago/${pagoId}`));
  
      // Actualizar el estado de avance eliminando el avance específico
      setAvance(pago => pago.filter(pago => pago.id !== pagoId));
  
      console.log("Avance eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el avance:", error);
    }
  };

  const handleEstadoChange = async (e) => {
    const nuevoEstado = e.target.value;
    setSelectedEstado(nuevoEstado);
    try {
      await updateDoc(doc(db, "proyectos", id), { estado: nuevoEstado });
      console.log("Estado del proyecto actualizado correctamente.");
      setPageUpdated(true);
    } catch (error) {
      console.error("Error al actualizar el estado del proyecto:", error);
    }
  };

  useEffect(() => {
    if (pageUpdated) {
      const getProductById = async (id) => {
        const product = await getDoc(doc(db, "proyectos", id));
        if (product.exists()) {
          const fetchedProyecto = product.data();
          setProyecto(fetchedProyecto);
        }
      };

      getProductById(id);
      setPageUpdated(false);
    }
  }, [pageUpdated, id]);

  return (
    <div className="w-full min-h-screen">
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
        {/* seleccion de estados del Proyecto */}
        <div>
          <select
            value={selectedEstado}
            onChange={handleEstadoChange}
            className="form-select mr-2 block rounded-md shadow-sm focus:outline-none focus:shadow-outline font-bold sm:text-xl py-2 px-4 bg-white text-orange-600"
          >
            <option value="">Cambiar Estado</option>
            <option value="Activo">Activo</option>
            <option value="Pausado">Pausado</option>
            <option value="Terminado">Terminado</option>
          </select>
        </div>
      </div>

      {/* Detalles de los boton de crear acuerdo  */}
      {!acuerdo && (
        <div className="px-16">
          <button className="bg-orange-400 hover:bg-orange-300 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outlineitems-center">
            <Link to={`/Crearacuerdo/${id}`} className="flex items-center">
              <PlusIcon className="w-6 h-6" />
              Acuerdo Inicial
            </Link>
          </button>
        </div>
      )}

      {/* Detalles del Proyecto */}
      <div className="container">
        <div className="row justify-content-center">
          {/* Detalles del Proyecto */}
          <div className="col-md-11">
            <div className="text-black">
              <form
                className="bg-white shadow-md rounded px-5 pt-3 pb-3 mb-2 "
                style={{ border: "3px solid orange" }}
              >
                <div className="grid grid-cols-4 gap-x-2">
                  {/* Datos del Proyecto */}
                  <div>
                    <h2 className="text-center text-2xl font-bold mb-2 text-orange-500">
                      Datos Proyecto:
                    </h2>
                    <div className="mb-1 text-center">
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Rol: {proyecto.rol}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Cliente: {proyecto.cliente}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Municipalidad: {proyecto.municipalidad}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Dirección: {proyecto.direccion}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Tipo de proyecto: {proyecto.tipo}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Estado: {proyecto.estado}
                      </label>
                      <Link
                        to={`/Editarproyecto/${id}`}
                        className="text-orange-400 hover:text-orange-300 font-bold py-2 px-2 my-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Editar
                      </Link>
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
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Rut: {cliente.rut}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Email: {cliente.email}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Teléfono: {cliente.telefono}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Representante legal: {cliente.relegals}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Datos factura: {cliente.datosfacturacion}
                      </label>
                      <Link
                        to={`/Editarcliente/${cliente.id}`}
                        className="text-orange-400 hover:text-orange-300 font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Editar
                      </Link>
                    </div>
                  </div>
                  {/* Detalles del acuerdo */}
                  <div>
                    <h2 className="text-center text-2xl font-bold mb-2 text-orange-500">
                      Acuerdo Inicial:
                    </h2>
                    <div className="mb-1 text-center">
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Monto Honorario: {acuerdo.monto}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Anticipo: {acuerdo.anticipo}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Cotización: {acuerdo.cotizacion}
                      </label>
                      <label
                        htmlFor="date"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Fecha: {acuerdo.fecha}
                      </label>
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-lg mb-1"
                      >
                        Formas de pago: {acuerdo.forma}
                      </label>
                      <Link
                        to={`/Editaracuerdo/${id}/${acuerdo.id}`}
                        className="  text-orange-500 hover:text-orange-300 text-xl flex justify-content-center"
                      >
                        Editar
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-center text-2xl font-bold mb-2 text-orange-500">
                      Datos extras del proyecto:
                    </h2>
                    <div className="mb-1 text-center">
                      <label
                        htmlFor="text"
                        className="block text-gray-700 text-md mb-1 "
                      >
                         {proyecto.descripcion}
                      </label>
                    </div>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="px-12">
        <DescargarPDF proyecto={proyecto} cliente={cliente} acuerdo={acuerdo} />
      </div>

      {/* Detalles del Pagos y avances  */}

      <div className="container-fluid px-8 py-4">
        <div className="row">
          <div className="col-md-12">
            <div className="flex justify-between items-center px-4 mb-3">
              <h2 className="text-3xl font-semibold">Pagos</h2>
              <button className="bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <Link to={`/Crearpago/${id}`} className="flex items-center">
                  <PlusIcon className="w-6 h-6" />
                  Pagos
                </Link>
              </button>
            </div>
            <div className="d-flex flex-wrap px-4 py-2">
              {pagos.map((pago) => (
                <div
                  key={pago.id}
                  className="bg-white p-3 shadow-md rounded mb-2 mr-2"
                  style={{ maxWidth: "220px", border: "3px solid orange" }}
                >
                  <p className="font-bold text-lg">Descripcion de pago:</p>
                  <p className="font-semibold text-sm"> {pago.descripcion}</p>
                  <p className="font-bold text-lg">Monto a cobrar:</p>
                  <p className="font-semibold text-sm"> {pago.monto}</p>
                  <p className="font-bold text-lg">Avance a tener:</p>
                  <p className="font-semibold text-sm"> {pago.avance}</p>
                  <p className="font-bold text-lg"> Impuesto a pagar: </p>
                  <p className="font-semibold text-sm"> {pago.impuesto} </p>
                  <p className="font-bold text-lg"> Fecha inicio:</p>
                  <p className="font-semibold text-sm">
                    {pago.fechai.toDate().toLocaleDateString()}
                  </p>
                  <p className="font-bold text-lg">Fecha vencimiento: </p>
                  <p className="font-semibold text-sm">
                    {pago.fechav.toDate().toLocaleDateString()}
                  </p>
                  <p className="font-bold text-lg">Estado:</p>
                  <p className="font-semibold text-sm"> {pago.estado}</p>
                  <div className="d-flex justify-content-end mt-2">
                    <Link
                      to={`/Editarpago/${id}/${pago.id}`}
                      className="text-orange-500 hover:text-orange-300 text-md px-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deletePago(id,pago.id)}
                      className="text-red-700 hover:text-red-500 px-2 focus:outline-none focus:shadow-outline"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-12">
            <div className="flex justify-between items-center  px-4 mb-4">
              <h2 className="text-3xl font-semibold">Avance Internos</h2>
              <button className=" bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <Link to={`/Crearavance/${id}`} className="flex items-center">
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
                      to={`/Editaravance/${id}/${avance.id}`} // Aquí se incluyen ambos parámetros
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
