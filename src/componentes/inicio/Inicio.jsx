import React from "react";
import Navbar from "./Navbar";
import ser3 from "../../assets/ser3.png";
import ser8 from "../../assets/ser8.jpg";
import ser9 from "../../assets/ser9.jpg";
import ser13 from "../../assets/ser13.jpg";
import ser10 from "../../assets/ser10.jpg";
import ser12 from "../../assets/ser12.jpg";
import ser4 from "../../assets/ser4.jpg";
import ser5 from "../../assets/ser5.jpg";
import {
  PhoneIcon,
  EnvelopeOpenIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const callouts = [
  {
    name: "Dirección",
    description: "Chacabuco #485 Oficina 303 Concepción",
    icon: MapPinIcon,
  },
  {
    name: "Teléfono",
    description: "(+56) 9 78788639",
    icon: PhoneIcon,
  },
  {
    name: "Email",
    description: "bernardo.suazo@syvconsultores.cl",
    icon: EnvelopeOpenIcon,
  },
];
const links = [
  { name: "Estudios y proyectos de planificación", href: "/Servicio" },
  { name: "Tasaciones", href: "/Servicio" },
  { name: "Revisiones independientes", href: "/Servicio" },
];
const Inicio = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-24 lg:overflow-visible lg:px-4">
        <div className="absolute inset-4 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-12 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-400 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
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
            <svg x="50%" y={-1} className="overflow-visible fill-gray-100">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={16}
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-36">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Anunciando nuestros servicios de consultoría en arquitectura.{" "}
              <a href="/Quienes" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Leer más <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              S y V Consultores LTDA
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              SyV Consultores Ltda. se enfoca en la creación y revisión de
              proyectos arquitectónicos, ofreciendo consultoría especializada en
              gestión inmobiliaria y planificación urbana.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/Servicio"
                className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Servicios
              </a>
              <a
                href="/Contacto"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Contactenos <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden bg-white">
          <div className="pb-80 pt-12 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
            <div className="relative mx-36 max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="sm:max-w-lg">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  ¿Quienes somos?
                </h1>
                <p className="mt-12 text-xl text-gray-500">
                  SyV Consultores Ltda. se dedica a la creación y revisión de
                  proyectos arquitectónicos, con especialización en consultoría
                  inmobiliaria y planificación urbana. Estamos comprometidos a
                  ofrecer una gama completa de servicios personalizados para
                  satisfacer las necesidades de nuestros clientes, incluyendo
                </p>
              </div>
              <div>
                <div className="mt-20 ">
                  {/* Decorative image grid */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                  >
                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                      <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-60 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                            <img
                              src={ser9}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-60 w-44 overflow-hidden rounded-lg">
                            <img
                              src={ser8}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-56 w-44 overflow-hidden rounded-lg">
                            <img
                              src={ser10}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-56 w-44 overflow-hidden rounded-lg">
                            <img
                              src={ser4}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-56 w-44 overflow-hidden rounded-lg">
                            <img
                              src={ser12}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-60 w-44 overflow-hidden rounded-lg">
                            <img
                              src={ser5}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-60 w-44 overflow-hidden rounded-lg">
                            <img
                              src={ser3}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-6 text-orange-600 sm:grid-cols-2 md:flex lg:gap-x-6">
                      {links.map((link) => (
                        <a key={link.name} href={link.href}>
                          {link.name} <span aria-hidden="true">&rarr;</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative isolate mt-10 overflow-hidden bg-gray-900 py-24 sm:py-32">
          <img
            src={ser13}
            alt=""
            className="absolute inset-0 -z-10  w-full object-cover object-right opacity-20 md:object-center"
          />
          <div
            className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div
            className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            aria-hidden="true"
          >
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-1 max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                S y V Consultores LTDA
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300 ">
                SyV Consultores Ltda. se enfoca en la creación y revisión de
                proyectos arquitectónicos, ofreciendo consultoría especializada
                en gestión inmobiliaria y planificación urbana.
              </p>
            </div>
            <div className="mx-auto mt-4 max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                {links.map((link) => (
                  <a key={link.name} href={link.href}>
                    {link.name} <span aria-hidden="true">&rarr;</span>
                  </a>
                ))}
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
                {callouts.map((callout) => (
                  <div key={callout.name} className="group relative">
                    <div className="relative h-8 w-full overflow-hidden sm:h-12">
                      {
                        <callout.icon className="h-full object-cover text-orange-500" />
                      }
                    </div>
                    <h3 className="mt-6 text-sm text-gray-200">
                      <a>
                        <span className="absolute inset-0" />
                        {callout.name}
                      </a>
                    </h3>
                    <p className="text-base font-semibold text-white">
                      {callout.description}
                    </p>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
