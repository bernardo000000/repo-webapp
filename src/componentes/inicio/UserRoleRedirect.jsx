import React from "react";
import Navbar from "./Navbar";

const callouts = [
  {
    name: "Gerente",
    description: "Iniciar Sesión como Gerente",
    imageSrc:
      "https://www.roberthalf.cl/sites/roberthalf.cl/files/styles/full_width_content_image_1x_extra_large_1036/public/2020-10/Cargos%20de%20gerencia_Qu%C3%A9%20aspectos%20destacar%20para%20llamar%20la%20atenci%C3%B3n%20del%20seleccionador.jpg?itok=B8G-ne5g",
    href: "/Login",
  },
  {
    name: "Colaboradores",
    description: "Iniciar Sesión como Colabordor",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    href: "LoginT",
  },
];

export default function UserRoleRedirect() {
  return (
    <div className=" min-h-screen w-full">
      <Navbar/>
      <div className="absolute inset-4 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-12 h-[64rem] w-[128rem] -translate-x-1/2 stroke-orange-400 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
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

      
      <div className="mx-auto max-w-6xl px-4 sm:px-4 lg:px-8 mt-3">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className=" text-center text-5xl font-bold text-gray-600 mb-5">
            Bienvenido a S y V consultores
          </h2>
          <h2 className="text-2xl font-semibold text-gray-700">
            Eligue como quieres Iniciar Sesion
          </h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-xl font-bold text-orange-400">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
