import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import imagen1 from "../assets/ser3.png";
import Navbar from "./inicio/Navbar";


function Registrarse() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "colaborador", // Definir el rol predeterminado como "colaborador"
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password, user.role); // Pasar el rol al método signup
      navigate("/Redic");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      {error}
      <Navbar />
      <div className="row">
        <div className="absolute inset-4 -z-10 overflow-hidden mt-9">
          <svg
            className="absolute left-[max(50%,25rem)] top-2 h-[64rem] w-[128rem] -translate-x-1/2 stroke-orange-600 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
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
        <div className="col-md-3 mt-32 ">
          <div className="w-full max-w-xs m-auto text-black ">
            <h2 className="text-center text-6xl font-bold mb-4">
              {" "}
              Regístrate{" "}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-6"
            >
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="youremail@company.tld"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="*************"
                />
              </div>

              {/* Agregar campo de selección para el rol */}
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Rol
                </label>
                <select
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                  value={user.role}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="gerente">Gerente</option>
                  <option value="colaborador">Colaborador</option>
                </select>
              </div>

              <button className="bg-orange-400 hover:bg-orange-300 text-white  font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
                Regístrate
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-9 mt-36">
          <img src={imagen1} className=" max-auto pt-6 " />
        </div>
      </div>
    </div>
  );
}

export default Registrarse;
