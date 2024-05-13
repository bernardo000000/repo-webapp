import React, { useState, useEffect } from "react";
import Dashboard from "./DashboardT";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import usePagination from "@mui/material/usePagination";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const ClientesT = () => {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const clientesPerPage = 12; // Número de clientes por página

  const clienteCollection = collection(db, "clientes");

  const getClientes = async () => {
    const data = await getDocs(clienteCollection);
    setClientes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getClientes();
  }, []);

  const deleteCliente = async (id) => {
    const clientDoc = doc(db, "clientes", id);
    await deleteDoc(clientDoc);
    getClientes();
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const filteredClientes = clientes.filter((proyecto) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      proyecto.nombre.toLowerCase().includes(searchTermLowerCase) ||
      proyecto.rut.toLowerCase().includes(searchTermLowerCase) ||
      proyecto.email.toLowerCase().includes(searchTermLowerCase) ||
      proyecto.datosfacturacion.toLowerCase().includes(searchTermLowerCase) ||
      proyecto.telefono.toLowerCase().includes(searchTermLowerCase) ||
      proyecto.relegals.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const { items } = usePagination({
    count: Math.ceil(filteredClientes.length / clientesPerPage),
    onChange: handleChangePage,
  });

  const paginatedClientes = filteredClientes.slice(
    (currentPage - 1) * clientesPerPage,
    currentPage * clientesPerPage
  );

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
      <h1 className="text-3xl font-bold text-center mt-4">Lista de Clientes</h1>
      <div className=" px-16 py-6 flex justify-center">
        <div className="flex col-md-4">
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            name="user_name"
            autoComplete="given-name"
            className="block w-full font-medium text-pretty rounded-md border-2 border-orange-300 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          {paginatedClientes.map((cliente) => (
            <div className="col-md-3 mb-4" key={cliente.id}>
              <div className="card" style={{ border: "2px solid orange" }}>
                <div className="card-body text-center">
                  <h3 className="card-title text-2xl text-orange-500 font-bold">
                    {cliente.nombre}
                  </h3>
                  <p>Rut: {cliente.rut}</p>
                  <p>Representante Legal: {cliente.relegals}</p>
                  <p>Telefono: {cliente.telefono}</p>
                  <p>Email: {cliente.email}</p>
                  <p>Datos Facturación: {cliente.datosfacturacion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        {items.map((item, index) => (
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
            ) : (
              item.page
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClientesT;
