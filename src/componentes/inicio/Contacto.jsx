import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import {
  PhoneIcon,
  EnvelopeOpenIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import emailjs from "@emailjs/browser";

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

export default function Contacto() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_uuvxsx8", "template_htjxq8m", form.current, {
        publicKey: "JHgS6faDXmX8ISHRu",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-7xl px-6 sm:px-4 lg:px-4">
          <div className="mx-auto max-w-2xl py-12 sm:py-20 lg:max-w-none lg:py-16">
            <div className="mt-1 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-16 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-8 w-full overflow-hidden sm:h-12">
                    {
                      <callout.icon className="h-full object-cover text-orange-500" />
                    }
                  </div>
                  <h3 className="mt-2 text-sm text-gray-500">
                    <a>
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

        <div className="isolate px-4 py-4 sm:py-32 lg:px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comuníquese con Nosotros
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Para solicitar un presupuesto o obtener más información, no dude
              en contactarnos
            </p>
          </div>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="mx-auto mt-4 max-w-xl sm:mt-20"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Nombre Completo
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="user_name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-2 border-orange-200 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="user_email"
                    autoComplete="email"
                    className="block w-full rounded-md border-2 border-orange-200 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Mensaje
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    rows={4}
                    className="block w-full rounded-md border-2 border-orange-200 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-orange-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
