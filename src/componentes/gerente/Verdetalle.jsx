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
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import DescargarPDF from "./DescargarPdf";
import ActualizarEstadosPagos from "/src/componentes/ActualizarEstadosPagos.jsx";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

// Resto del código de Verdetalle.jsx...

const Verdetalle = () => {
  const [proyecto, setProyecto] = useState("");
  const [cliente, setCliente] = useState("");
  const [acuerdo, setAcuerdo] = useState("");
  const [pagos, setPagos] = useState([]);
  const [avance, setAvance] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState("");
  const [pageUpdated, setPageUpdated] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalPago, setModalPago] = useState(null);

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
          const acuerdoProyecto = proyectoAcuerdoSnapshot.docs[0].data();
          const acuerdoConId = {
            id: proyectoAcuerdoSnapshot.docs[0].id,
            ...acuerdoProyecto,
          };
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

  const deleteAvance = async (idProyecto, avanceId, archivoURL) => {
    try {
      if (archivoURL) {
        const fileRef = ref(storage, archivoURL);
        await deleteObject(fileRef);
        console.log("Archivo eliminado correctamente de Storage.");
      }

      await deleteDoc(doc(db, `proyectos/${idProyecto}/avance/${avanceId}`));
      console.log("Avance eliminado correctamente de Firestore.");

      setAvance((avance) => avance.filter((avance) => avance.id !== avanceId));
    } catch (error) {
      console.error("Error al eliminar el avance:", error);
    }
  };

  const deletePago = async (idProyecto, pagoId, archivoURL) => {
    try {
      if (archivoURL) {
        const fileRef = ref(storage, archivoURL);
        await deleteObject(fileRef);
        console.log("Archivo eliminado correctamente de Storage.");
      }

      await deleteDoc(doc(db, `proyectos/${idProyecto}/pago/${pagoId}`));
      console.log("Pago eliminado correctamente de Firestore.");

      setPagos((pagos) => pagos.filter((pago) => pago.id !== pagoId));
      if (modalPago && modalPago.id === pagoId) {
        setModalPago(null);
      }
    } catch (error) {
      console.error("Error al eliminar el pago:", error);
    }
  };

  const handleEstadoChange = async (e) => {
    const nuevoEstado = e.target.value;
    setSelectedEstado(nuevoEstado);
    try {
      await updateDoc(doc(db, "proyectos", id), { estado: nuevoEstado });
      console.log("Estado del proyecto actualizado correctamente.");
      toast.success("¡Se cambio el estado!",{
        position:"top-center",
        autoClose: 9000,
        reverseOrder:false,
      })
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

  const handlePagoClick = (pago) => {
    setModalPago(pago);
    setOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dialog-panel")) {
        setOpen(false);
        setModalPago(null);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

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
          <Toaster />
        </div>
      </div>

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

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-11">
            <div className="text-black">
              <form
                className="bg-white shadow-md rounded px-5 pt-3 pb-3 mb-2 "
                style={{ border: "3px solid orange" }}
              >
                <div className="grid grid-cols-4 gap-x-2">
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

      <div className="container py-4">
        <div className="row">
          <div className="col-md-12">
            <div className="flex justify-between px-2 mb-4">
              <h2 className="text-3xl font-semibold">Pagos</h2>
              <button className="bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">
                <Link to={`/Crearpago/${id}`} className="flex items-center">
                  <PlusIcon className="w-6 h-6" />
                  Pagos
                </Link>
              </button>
            </div>
            <div className="d-flex flex-wrap">
              {pagos.map((pago) => (
                <div
                  key={pago.id}
                  className="bg-white p-2 shadow-md rounded mb-2 mr-2"
                  style={{ maxWidth: "220px", border: "3px solid orange" }}
                  onClick={() => handlePagoClick(pago)}
                >
                  <p className="font-bold text-lg">Descripcion de pago:</p>
                  <p className="font-semibold text-sm"> {pago.descripcion}</p>
                  <p className="font-bold text-lg">Fecha vencimiento: </p>
                  <p className="font-semibold text-sm">
                    {pago.fechav.toDate().toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-12">
            <div className="flex justify-between px-2 mb-4">
              <h2 className="text-3xl font-semibold">Avance Internos</h2>
              <button className=" bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">
                <Link to={`/Crearavance/${id}`} className="flex items-center">
                  <PlusIcon className="w-6 h-6" />
                  Avances
                </Link>
              </button>
            </div>
            <div className="d-flex flex-wrap ">
              {avance.map((avance) => (
                <div
                  key={avance.id}
                  className="bg-white p-2 shadow-md rounded mb-2 mr-2"
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
                  <div className="flex items-center">
                    <p className="font-bold text-lg">Archivo:</p>
                    <a
                      href={avance.archivoURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-md text-orange-500 underline ml-2" // Ajusta el espacio a tu gusto
                    >
                      Ver archivo
                    </a>
                  </div>

                  <div className="d-flex justify-content-end mt-1">    
                    <Link
                      to={`/Editaravance/${id}/${avance.id}`}
                      className="text-orange-500 hover:text-orange-300 text-md py-2 px-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() =>
                        deleteAvance(id, avance.id, avance.archivoURL)
                      }
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

      {modalPago && (
        <Transition show={open} as={React.Fragment}>
          <Dialog
            className="relative z-10"
            open={open}
            onClose={() => setOpen(false)}
          >
            <Transition.Child
              as={React.Fragment}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={React.Fragment}
                    enter="transform transition duration-500 ease-in-out"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition duration-500 ease-in-out"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md dialog-panel">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6 flex justify-between items-center">
                          <Dialog.Title className="text-4xl font-semibold text-orange-500">
                            Detalles del Pago
                          </Dialog.Title>
                          <button
                            type="button"
                            className="text-orange-500 hover:text-orange-700 text-9xl "
                            onClick={() => setOpen(false)}
                          >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <p className="font-bold text-lg">
                            Descripcion de pago:
                          </p>
                          <p className="font-semibold text-md">
                            {modalPago.descripcion}
                          </p>
                          <div className="flex items-center">
                            <p className="font-bold text-lg">
                              Monto a cobrar:{" "}
                            </p>
                            <p className="font-semibold text-md ml-2">
                              {modalPago.monto}
                            </p>
                          </div>
                          <p className="font-bold text-lg">Avance a tener:</p>
                          <p className="font-semibold text-md">
                            {modalPago.avance}
                          </p>
                          <div className="flex items-center">
                            <p className="font-bold text-lg">
                              Impuesto a pagar{" "}
                            </p>
                            <p className="font-semibold text-md ml-2">
                              {modalPago.impuesto}
                            </p>
                          </div>

                          <div className="flex items-center">
                            <p className="font-bold text-lg">Fecha Inicio </p>
                            <p className="font-semibold text-md ml-2">
                              {modalPago.fechai.toDate().toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex items-center">
                            <p className="font-bold text-lg">
                              Fecha Vencimiento{" "}
                            </p>
                            <p className="font-semibold text-md ml-2">
                              {modalPago.fechav.toDate().toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex items-center">
                            <p className="font-bold text-lg">Estado: </p>
                            <p className="font-semibold text-md ml-2">
                              {modalPago.estado}
                            </p>
                          </div>

                          <div className="flex items-center">
                            <p className="font-bold text-lg">Archivo:</p>
                            <a
                              href={modalPago.archivoURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-md text-orange-500 underline ml-2" // Ajusta el espacio a tu gusto
                            >
                              Ver archivo
                            </a>
                          </div>

                          <div className="d-flex justify-content-end mt-1">
                            <Link
                              to={`/Editarpago/${id}/${modalPago.id}`}
                              className="text-orange-500 hover:text-orange-300 text-lg py-2 px-2 font-medium "
                            >
                              Editar
                            </Link>
                            <button
                              onClick={() =>
                                deletePago(
                                  id,
                                  modalPago.id,
                                  modalPago.archivoURL
                                )
                              }
                              className="text-red-700 hover:text-red-500 py-2 px-2 focus:outline-none focus:shadow-outline text-lg font-medium "
                            >
                              Borrar
                            </button>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
};

export default Verdetalle;

