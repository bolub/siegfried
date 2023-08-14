import { type PdfServiceType } from "@/server/modules/pdf-service/interface";
import { Doppio } from "../doppio-adapter/impl";

export const generatePdf: PdfServiceType["generatePdf"] = async ({
  html,
  name,
}) => {
  // @ts-ignore
  const encodedHTML = new Buffer.from(html, "utf8").toString("base64");

  if (!encodedHTML) {
    throw new Error("Small issue with your html");
  }

  const { pdfData } = await Doppio.generatePdf({ encodedHTML });

  if (!pdfData) {
    throw new Error("Couldn't generate pdf, sorry");
  }

  return {
    pdfFilePath: pdfData,
  };
};

export const PdfService: PdfServiceType = {
  generatePdf,
};
