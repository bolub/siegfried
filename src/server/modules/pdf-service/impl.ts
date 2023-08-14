import { type PdfServiceType } from "@/server/modules/pdf-service/interface";
import fs from "fs";
import path from "path";
import { chromium } from "playwright";

export const generatePdf: PdfServiceType["generatePdf"] = async ({
  html,
  name,
}) => {
  // const cl = path.join(
  //   process.cwd(),
  //   ".vercel",
  //   ".cache",
  //   "ms-playwright",
  //   "chromium-1076"
  // );

  const browser = await chromium.launch();

  const page = await browser.newPage();

  const cssPath = path.join(process.cwd(), "src", "styles", "build.css");

  await page.setContent(html, { waitUntil: "networkidle" });
  await page.addStyleTag({ path: cssPath });

  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

  await browser.close();

  const pdfFilePath = path.join(
    process.cwd(),
    "public",
    `${name ?? "generated-pdf"}.pdf`
  );
  fs.writeFileSync(pdfFilePath, pdfBuffer);

  return {
    pdfFilePath,
  };
};

export const PdfService: PdfServiceType = {
  generatePdf,
};
