import { type PdfServiceType } from "@/server/modules/pdf-service/interface";
import path from "path";
import puppeteer from "puppeteer";

export const generatePdf: PdfServiceType["generatePdf"] = async ({
  html,
  name,
}) => {
  const pdfFilePath = path.join(
    process.cwd(),
    "public",
    `${name ?? "generated-pdf"}.pdf`
  );

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({ path: pdfFilePath, format: "A4" });

  await browser.close();

  return {
    pdfFilePath,
  };
};

export const PdfService: PdfServiceType = {
  generatePdf,
};
