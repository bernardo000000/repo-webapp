import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { collection, addDoc, doc } from "@firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';

const Crearavance = () => {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const sendEmail = (fileURL) => {
    const templateParams = {
      nombre: nombre,
      fecha: fecha.toISOString().split("T")[0],
      descripcion: descripcion,
      archivoURL: fileURL,
      proyectoId: id
    };

    emailjs.send('service_ou3si4v', 'template_misz1cs', templateParams, 'JHgS6faDXmX8ISHRu')
      .then((response) => {
        console.log('Correo enviado exitosamente:', response.status, response.text);
      }, (error) => {
        console.error('Error al enviar el correo:', error);
      });
  };

  const store = async (e) => {
    e.preventDefault();
    try {
      // Generar un nombre único para el archivo si hay un archivo seleccionado
      let fileURL = null;
      if (archivo) {
        const uniqueFileName = `${uuidv4()}-${archivo.name}`;
        // Subir el archivo a Firebase Storage con el nombre único
        const storageRef = ref(storage, `proyectos/${id}/avances/${uniqueFileName}`);
        const snapshot = await uploadBytes(storageRef, archivo);
        fileURL = await getDownloadURL(snapshot.ref);
      }

      // Guardar los datos del avance en Firestore
      await addDoc(collection(doc(db, "proyectos", id), "avance"), {
        nombre: nombre,
        fecha: fecha,
        descripcion: descripcion,
        archivoURL: fileURL,
      });

      // Enviar correo electrónico
      sendEmail(fileURL);

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
      <div className="mt-6">
        <div className="w-full max-w-xl m-auto text-black">
          <h2 className="text-center text-5xl font-bold mb-3">Crear Avance:</h2>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-6" onSubmit={store}>
            <div className="mb-4">
              <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
                Nombre Avance:
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
              <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
                Fecha Avance:
              </label>
              <input
                type="date"
                value={fecha.toISOString().split("T")[0]}
                onChange={(e) => setFecha(new Date(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
                Descripción Avance:
              </label>
              <textarea
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ejemplo: Se creó una vista"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
                Archivo del Avance:
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button className="bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Crearavance;
