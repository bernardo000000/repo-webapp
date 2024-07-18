import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import toast, { Toaster } from "react-hot-toast";

const DescargarPDF = ({ proyecto, cliente, acuerdo }) => {
  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    // Título y texto de confirmación
    pdf.setFontSize(14);
    pdf.text("Orden de Compra", 90, 10);
    pdf.setFontSize(10);
    pdf.text(
      "Este documento es para confirmar que los datos del proyecto,de usted como cliente y acuerdo iniciales respecto al",
      10,
      20
    );
    pdf.text("proyecto mismo son correctos.", 10, 23);

    // Detalles del proyecto
    pdf.setFontSize(12);
    pdf.text("Detalles del Proyecto:", 10, 30);
    pdf.setFontSize(10);
    const proyectoData = [
      ["Rol:", proyecto.rol],
      ["Cliente:", proyecto.cliente],
      ["Municipalidad:", proyecto.municipalidad],
      ["Dirección:", proyecto.direccion],
      ["Tipo de proyecto:", proyecto.tipo],
    ];
    pdf.autoTable({
      startY: 35,
      head: [["Campos", "Datos"]],
      body: proyectoData,
    });

    // Detalles del Cliente
    pdf.setFontSize(12);
    pdf.text("Detalles del Cliente:", 10, pdf.autoTable.previous.finalY + 10);
    pdf.setFontSize(10);
    const clienteData = [
      ["Representante legal:", cliente.relegals],
      ["Rut:", cliente.rut],
      ["Email:", cliente.email],
      ["Teléfono:", cliente.telefono],
      ["Datos factura:", cliente.datosfacturacion],
    ];
    pdf.autoTable({
      startY: pdf.autoTable.previous.finalY + 15,
      head: [["Campos", "Datos"]],
      body: clienteData,
    });

    // Detalles del Acuerdo
    if (acuerdo) {
      pdf.setFontSize(12);
      pdf.text("Acuerdo Inicial:", 10, pdf.autoTable.previous.finalY + 10);
      pdf.setFontSize(10);
      const acuerdoData = [
        ["Monto Honorario:", acuerdo.monto],
        ["Anticipo:", acuerdo.anticipo],
        ["Cotización:", acuerdo.cotizacion],
        ["Fecha inicio:", acuerdo.fecha],
        ["Formas de pago:", acuerdo.forma],
      ];
      pdf.autoTable({
        startY: pdf.autoTable.previous.finalY + 15,
        head: [["Campos", "Datos"]],
        body: acuerdoData,
      });
    }

    pdf.setFontSize(12);
    pdf.text(
      "Datos de Transferencia: S y V Consultores ",
      10,
      pdf.autoTable.previous.finalY + 10
    );
    pdf.setFontSize(10);
    const acuerdoData = [
      ["Direccion: Chacabuco 485 Oficina 303"],
      ["Cuidad:Concepción"],
      ["Rut:77.015.750-1"],
      ["Cuenta: Corriente"],
      ["Número de cuenta: 0203264659"],
      ["Fono:+569 7878 8639"],
      ["Email:bernardo.suazo@syvconsultores.cl "],
    ];
    pdf.autoTable({
      startY: pdf.autoTable.previous.finalY + 15,
      head: [["Datos de factura"]],
      body: acuerdoData,
    });

    // Texto de despedida
    pdf.setFontSize(10);
    pdf.text(
      "Si encuentra algún error en los datos proporcionados, le rogamos que se comunique de inmediato con nosotros para que",
      10,
      pdf.autoTable.previous.finalY + 6
    );
    pdf.text(
      "podamos rectificarlo y realizar las correcciones pertinentes. Agradecemos de antemano su confianza en nuestra empresa.",
      10,
      pdf.autoTable.previous.finalY + 9
    );

    // Guardar el PDF
    pdf.save("detalles_proyecto.pdf");
  };

  const notify = () => toast.success("¡Ya se inicio la descarga!",{
    position:"bottom-right",
    autoClose: 5000,
    reverseOrder:false,
  });

  const clicks = () => {
    notify();
    handleDownloadPDF();
  };
  return (
    <div>
      <button
        onClick={clicks}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      >
        Descargar Factura
      </button>
      <Toaster />
      
    </div>
  );
};

export default DescargarPDF;
