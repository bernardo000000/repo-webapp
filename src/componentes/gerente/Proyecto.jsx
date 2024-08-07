import React, { useState, useEffect } from "react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import usePagination from "@mui/material/usePagination";

const Proyecto = () => {
  const [proyectos, setProyectos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const clientesPerPage = 12; // Número de proyectos por página
  const pagination = usePagination({
    count: Math.ceil(proyectos.length / clientesPerPage),
    page: currentPage,
    onChange: (event, page) => setCurrentPage(page),
  });

  const proyectoCollection = collection(db, "proyectos");

  const getProyectos = async () => {
    const data = await getDocs(proyectoCollection);
    setProyectos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getProyectos();
  }, []);

  const deleteSubcollections = async (documentRef) => {
    const subcollectionNames = ['pago', 'avance']; // Nombres de las subcolecciones a eliminar
    const subcollectionDeletionPromises = subcollectionNames.map(async (name) => {
      const subcollectionSnap = await getDocs(collection(documentRef, name));
      const subcollectionDocsDeletionPromises = subcollectionSnap.docs.map(async (subDoc) => {
        await deleteSubcollections(subDoc.ref); // Llamada recursiva para eliminar subcolecciones de las subcolecciones
        await deleteDoc(subDoc.ref); // Eliminar el documento de la subcolección
      });
      await Promise.all(subcollectionDocsDeletionPromises); // Esperar a que se eliminen todos los documentos de la subcolección
    });
  
    await Promise.all(subcollectionDeletionPromises); // Esperar a que se eliminen todas las subcolecciones
  };
  
  
  const deleteProyecto = async (id) => {
    const productDoc = doc(db, "proyectos", id);
    await deleteSubcollections(productDoc); // Delete all subcollections first
    await deleteDoc(productDoc); // Then delete the document
    getProyectos();
  };

  const filteredProyectos = proyectos.filter((proyecto) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      proyecto.nombre.toLowerCase().includes(searchTermLowerCase) ||
      proyecto.rol.toLowerCase().includes(searchTermLowerCase) ||
      proyecto.municipalidad.toLowerCase().includes(searchTermLowerCase) ||
      proyecto.cliente.toLowerCase().includes(searchTermLowerCase) ||
      proyecto.estado.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const customSort = (a, b) => {
    if (a.estado === "Pausado" && b.estado !== "Pausado") return -1;
    if (a.estado !== "Pausado" && b.estado === "Pausado") return 1;
    if (a.estado === "Activo" && b.estado !== "Activo") return -1;
    if (a.estado !== "Activo" && b.estado === "Activo") return 1;
    return 0;
  };

  // Ordenar los proyectos utilizando la función de ordenamiento personalizada
  const orderedProyectos = [...filteredProyectos].sort(customSort);

  // Calcular el índice del primer proyecto en la página actual
  const indexOfLastProyecto = currentPage * clientesPerPage;
  const indexOfFirstProyecto = indexOfLastProyecto - clientesPerPage;
  const currentProyectos = orderedProyectos.slice(indexOfFirstProyecto, indexOfLastProyecto);

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
      <h1 className="text-3xl font-bold text-center mt-4">
        Listas de Proyectos
      </h1>
      <div className="col-md-8 px-4 py-6">
        <div className="flex justify-between mb-4">
          <div className="flex">
            <button className="mr-12 bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <Link to={"/Crearproyecto"}>Agregar Proyecto</Link>
            </button>
          </div>
          <div className="flex items-center col-md-6">
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              name="user_name"
              autoComplete="given-name"
              className="block w-full font-medium text-pretty rounded-md border-2 border-orange-300 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          {currentProyectos.map((list) => (
            <div className="col-md-3 mb-3" key={list.id}>
              <div
                className="card"
                style={{
                  border: `3px solid ${
                    list.estado === "Activo"
                      ? "green"
                      : list.estado === "Pausado"
                      ? "red"
                      : "gray"
                  }`,
                }}
              >
                <div className="card-body text-center">
                  <h3 className="card-title text-2xl mt-2 text-orange-500 font-medium">
                    {list.nombre}
                  </h3>
                  <p>Rol: {list.rol}</p>
                  <p>Cliente: {list.cliente}</p>
                  <p>Direccion: {list.direccion}</p>
                  <p>Municipalidad: {list.municipalidad}</p>
                  <p>Tipo: {list.tipo}</p>
                  <p>Estado: {list.estado}</p>
                  <Link
                    to={`/Verdetalle/${list.id}`}
                    className=" text-orange-400 hover:text-orange-300 font-bold py-2 px-2 my-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Ver detalle
                  </Link>
                  <Link
                    to={`/Editarproyecto/${list.id}`}
                    className="text-orange-400 hover:text-orange-300 font-bold py-2 px-2 my-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Editar
                  </Link>
                  <button
                    className="text-red-700 hover:text-red-500 py-2 px-2 font-bold focus:outline-none focus:shadow-outline"
                    onClick={() => {
                      deleteProyecto(list.id);
                    }}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-4">

        {pagination.items.map((item, index) => (
          <button
          key={index}
          onClick={item.onClick}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: item.selected ? "orange" : "transparent",
            color: item.selected ? "#fff" : "#000",
          }}
          disabled={item.disabled}
        >
          {item.type === "previous" ? (
            <KeyboardArrowLeft />
          ) : item.type === "next" ? (
            <KeyboardArrowRight />
          ) : item.page}
        </button>
        ))}
      </div>
    </div>
  );
};

export default Proyecto;

