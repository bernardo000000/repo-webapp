import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import imagen1 from "../assets/ser5.jpg";
import logo from "../assets/logo.jpg";
import { Alerts } from "./Alerts";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Inicio", href: "/Inicio" },
  { name: "¿Quienes Somos?", href: "/Quienes" },
  { name: "Servicio", href: "/Servicio" },
  { name: "Contacto", href: "/Contacto" },
];

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);

      navigate("/T");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/T");
    } catch (error) {
      setError(error.message);
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

  return (
    <div className="container w-full min-h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/Inicio" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={logo} alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="/Redic"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Atras <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/Inicio" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src={logo} alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/Redic"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Atras
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

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
            <h2 className="text-center text-5xl font-bold mb-4">
              {" "}
              Trabajador{" "}
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
                  autoComplete="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="youremail@company.tld"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="password"
                  autoComplete="current-password"
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