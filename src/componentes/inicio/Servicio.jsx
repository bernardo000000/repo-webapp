import React from "react";
import Navbar from "./Navbar";
import ser12 from "../../assets/ser12.jpg";
import ser14 from "../../assets/ser14.jpg";
import ser4 from "../../assets/ser4.jpg";
import ser5 from "../../assets/ser5.jpg";



const features = [
  {
    name: "Estudios y proyectos de planificación",
    description:
      "Desarrollo de estudios y proyectos de planificación urbana tales como Planes Reguladores Comunales, Planes de Desarrollo Comunal, loteos, subdivisiones  y Planes Maestros, entre otros.",
  },
  {
    name: "Tasaciones",
    description:
      "Servicios de tasacion tanto para bienes urbanos como rurales en todo el pais.",
  },
  {
    name: "Revisiones independientes",
    description:
      "Servicios de revisores independientes de proyectos de arquitectura de Primera Categoría lo que nos permite revisar en todo Chile.",
  },
];

const posts = [
  {
    id: 1,
    title: "Estudios y proyectos de planificación ",
    description:
      "Desarrollo de estudios y proyectos de planificación urbana tales como Planes Reguladores Comunales, Planes de Desarrollo Comunal, loteos, subdivisiones  y Planes Maestros, entre otros. ",

    category: { title: "Planificaciones de Proyecto" },
  },
  {
    id: 2,
    title: "Tasaciones ",
    description:
      "Servicios de tasacion tanto para bienes urbanos como rurales en todo el pais. ",

    category: { title: "Tasaciones" },
  },
  {
    id: 3,
    title: "Revisiones independientes ",
    description:
      "Servicios de revisores independientes de proyectos de arquitectura de Primera Categoría lo que nos permite revisar en todo Chile.  ",

    category: { title: "Proyectos de Arquitectura" },
  },

  // More posts...
];

export default function Example() {
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
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nuestros Servicios
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              En SyV Consultores Ltda. se elaboran y tramitan integralmente
              proyectos de arquitectura, así como también:
            </p>

            <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 sm:gap-y-4 lg:gap-x-8">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="border-t border-gray-700 pt-4"
                >
                  <dt className="font-medium text-xl text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-lg text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid mt-36 grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              src={ser14}
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="rounded-lg bg-gray-100"
            />
            <img
              src={ser12}
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="rounded-lg bg-gray-100"
            />
            <img
              src={ser4}
              alt="Side of walnut card tray with card groove and recessed card area."
              className="rounded-lg bg-gray-100"
            />
            <img
              src={ser5}
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
