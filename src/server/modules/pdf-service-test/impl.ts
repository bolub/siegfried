import puppeteer from "puppeteer";
import path from "path";
import { type PdfServiceTypeTest } from "./interface";

export const generatePdf: PdfServiceTypeTest["generatePdf"] = async ({
  html,
}) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);

  const pdfPath = path.join(process.cwd(), "public", `test.pdf`);
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();

  return {
    pdfPath,
  };
};

export const PdfServiceTest: PdfServiceTypeTest = {
  generatePdf,
};
