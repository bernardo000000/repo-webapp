import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import imagen1 from "../assets/ser4.jpg";
import { Alerts } from "./Alerts";
import Navbar from "./inicio/Navbar";


function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [userRol, setUserRol] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      getRoles();
    } catch (error) {
      setError(error.message);
    }
  };
  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  const getRoles = async () => {
    const rolecitos = await getDocs(collection(db, "users"));
    const rolecito = rolecitos.docs.find(
      (doc) => doc.data().email === user.email
    );
    if (rolecito) {
      setUserRol({ ...rolecito.data() });
      if (rolecito.data().rol !== "gerente") {
        console.log("El usuario no tiene el rol de gerente");
        navigate("/T"); // Redireccionar si no tiene el rol de gerente
      } else {
        navigate("/");
      }
    } else {
      console.log("No se encontró el rol del usuario o no tiene rol asignado");
      navigate("/T"); // Redireccionar si no se encontró el rol o no tiene rol asignado
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError("We sent you an email. Check your inbox");
    } catch (error) {
      setError(error.message);
    }
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="container w-full min-h-screen">
      <Navbar/>
      {error && <Alerts message={error} />}
      <div className="row">
        <div className="absolute inset-4 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-12 h-[64rem] w-[128rem] -translate-x-1/2 stroke-orange-500 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
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
        <div className="col-md-4 mt-48 ">
          <div className="w-full max-w-xs m-auto text-black ">
            <h2 className="text-center text-5xl font-bold mb-2">
              {" "}
              Iniciar Sesión{" "}
            </h2>
            <h2 className="text-center text-5xl font-bold mb-4"> Gerente </h2>

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
                  autoComplete="email"
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
                  autoComplete="current-password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="*************"
                />
              </div>

              <button className="bg-orange-400 hover:bg-orange-300 text-white  font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
                Iniciar
              </button>
              <a
                className="inline-block align-baseline mx-4 font-bold text-sm text-black-700 hover:text-gray-500"
                href="#!"
                onClick={handleResetPassword}
              >
                Forgot Password?
              </a>
            </form>
            <p className="my-4 text-sm flex justify-between px-3">
              ¿No tienes cuenta?
              <Link
                to="/Registrarse"
                className="text-orange-600 hover:text-orange-400"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>
        <div className="col-md-6 mt-20">
          <img src={imagen1} className=" max-w-4xl pt-5 px-2 " />
        </div>
      </div>
    </div>
  );
}
export default Login;
