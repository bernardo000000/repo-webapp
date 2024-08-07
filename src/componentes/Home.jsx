import React, { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Dashboard from "./gerente/Dashboard";
import { getToken, getMessaging, onMessage } from "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [proyectos, setProyectos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const proyectoCollection = collection(db, "proyectos");

  const messaging = getMessaging();

  getToken(messaging, { vapidKey: import.meta.env.VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log("el token es ", currentToken);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });

  //getToken(messaging, import.meta.env.PAVID_KEY)

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const data = await getDocs(proyectoCollection);
        const proyectosList = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        for (let proyecto of proyectosList) {
          if (proyecto.estado === "Activo") {
            const pagosCollection = collection(
              db,
              `proyectos/${proyecto.id}/pago`
            );
            const pagosSnapshot = await getDocs(pagosCollection);
            const pagos = pagosSnapshot.docs.map((doc) => doc.data());
            const tienePagosPendientes = pagos.some(
              (pago) => pago.estado.toLowerCase() === "pendiente"
            );

            if (tienePagosPendientes && proyecto.estado !== "Pausado") {
              await setDoc(doc(db, "proyectos", proyecto.id), {
                ...proyecto,
                estado: "Pausado",
              });
              proyecto.estado = "Pausado"; // Actualizar directamente el objeto local
            } else if (!tienePagosPendientes && proyecto.estado !== "Activo") {
              await setDoc(doc(db, "proyectos", proyecto.id), {
                ...proyecto,
                estado: "Activo",
              });
              proyecto.estado = "Activo"; // Actualizar directamente el objeto local
            }
          }
        }

        // Actualizar el estado de proyectosList después de los cambios
        setProyectos([...proyectosList]); // Crear una nueva referencia de array
      } catch (error) {
        console.error("Error al obtener/procesar proyectos:", error.message);
        // Manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      }
    };

    fetchAndProcessData(); // Llamar a la función asincrónica al montar el componente
  }, []);

  const filteredProyectos = proyectos.filter((proyecto) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const terminados = ["finalizado", "completado", "terminado"];
    return (
      !terminados.includes(proyecto.estado.toLowerCase()) &&
      (proyecto.nombre.toLowerCase().includes(searchTermLowerCase) ||
        proyecto.rol.toLowerCase().includes(searchTermLowerCase) ||
        proyecto.municipalidad.toLowerCase().includes(searchTermLowerCase) ||
        proyecto.cliente.toLowerCase().includes(searchTermLowerCase) ||
        proyecto.tipo.toLowerCase().includes(searchTermLowerCase) ||
        proyecto.estado.toLowerCase().includes(searchTermLowerCase))
    );
  });

  const customSort = (a, b) => {
    if (a.estado === "Pausado" && b.estado !== "Pausado") return -1;
    if (a.estado !== "Pausado" && b.estado === "Pausado") return 1;
    if (a.estado === "Activo" && b.estado !== "Activo") return -1;
    if (a.estado !== "Activo" && b.estado === "Activo") return 1;
    return 0;
  };
  const orderedProyectos = [...filteredProyectos].sort(customSort);

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img className="h-10 w-10 rounded-full" src={logo} />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {payload.notification.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {payload.notification.body}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ));
  });

  return (
    <div className="w-full">
      <div className="max-h-full">
        <Toaster position="bottom-right" reverseOrder={true} />
        <div>
          <Dashboard />
        </div>
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
        <header className="mb-6">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900">
              Bienvenido/a a la Gerencia de S y V consultores
            </h1>
          </div>
        </header>
        <main>
          <div className="container">
            <div className="container mx-auto max-w-md my-4">
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
            <div className="row justify-content-center">
              {orderedProyectos.map((list) => (
                <div className="col-md-3 mb-4" key={list.id}>
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
                      <p>Municipalidad: {list.municipalidad}</p>
                      <p>Tipo: {list.tipo}</p>
                      <Link
                        to={`/Verdetalle/${list.id}`}
                        className="text-orange-400 hover:text-orange-300 font-bold py-2 px-4 my-2 mx-6 rounded focus:outline-none focus:shadow-outline"
                      >
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
