import React from "react";
import Navbar from "./Navbar";
import logo from "../../assets/logo.jpg";


const Inicio = () => {
  return (
    <div className="w-full bg-white min-h-screen">
      <Navbar />
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <figure className="mt-10">
            <div className="mx-auto max-w-2xl py-2 sm:py-48 lg:py-56">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  ¿Quienes Somos?
                </h1>
                <p className="mt-6 text-2xl leading-8 text-gray-600">
                  SyV Consultores Ltda. es una sociedad de profesionales
                  dedicada a la elaboración de diseños y revisión de proyectos
                  de arquitectura. Así como también asesorías relacionadas con
                  gestión inmobiliaria, tasaciones, diseño y
                  planificación urbana.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="/Servicio"
                    className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                  >
                    Servicios
                  </a>
                  <a
                    href="/Contacto"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Contactanos <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-10 w-10 rounded-full"
                src={logo}
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">
                  Bernardo Suazo Peña & Carmen Vigueras Falcón
                </div>
                <svg
                  viewBox="0 0 2 2"
                  width={3}
                  height={3}
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-gray-600">CEOS de S y V Consultores LTDA.</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
