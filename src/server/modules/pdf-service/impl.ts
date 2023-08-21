import { type PdfServiceType } from "@/server/modules/pdf-service/interface";
import { Doppio } from "@/server/modules/doppio-adapter/impl";

export const generatePdf: PdfServiceType["generatePdf"] = async ({ html }) => {
  // @ts-ignore
  const encodedHTML = new Buffer.from(html, "utf8").toString("base64");

  if (!encodedHTML) {
    throw new Error("Small issue with your html");
  }

  const { pdfData } = await Doppio.generatePdf({ encodedHTML });

  if (!pdfData) {
    throw new Error("Pdf could not be generated, please try again later");
  }

  return {
    url: pdfData,
  };
};

export const PdfService: PdfServiceType = {
  generatePdf,
};
