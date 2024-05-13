import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../../firebase";

const Crearcliente = () => {
  const [nombre, setNombre] = useState("");
  const [legal, setLegal] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [datos, setDatos] = useState("");
  const navigate = useNavigate();
  const productCollection = collection(db, "clientes");

  const store = async (e) => {
    e.preventDefault();
    await addDoc(productCollection, {
      nombre: nombre,
      rut: rut,
      relegals:legal,
      telefono: telefono,
      email: email,
      datosfacturacion: datos,
    });
    navigate("/Clientes");
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
      <div className=" mt-10 ">
          <div className="w-full max-w-xs m-auto text-black ">
            <h2 className="text-center text-5xl font-bold mb-4">
              {" "}
              Crear Cliente {" "}
            </h2>

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-6"
            onSubmit={store}>
                <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nombre Cliente:
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nombre Cliente "
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Rut Cliente:
                </label>
                <input
                  type="text"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="00000000-0"
                />
              </div>
              
              <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Representante legal:
                </label>
                <input
                  type="text"
                  value={legal}
                  onChange={(e) => setLegal(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nombre Apellido"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={ (e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="youremail@company.tld"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Telefono Cliente:
                </label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="+000 00000000"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Datos facturacion cliente:
                </label>
                <textarea
                  type="text"
                  value={datos}
                  onChange={(e) => setDatos(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  
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

export default Crearcliente;
