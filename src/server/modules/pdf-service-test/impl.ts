import path from "path";
import { type PdfServiceTypeTest } from "./interface";
import chromium from "chrome-aws-lambda";
import playwright from "playwright-core";

export const generatePdf: PdfServiceTypeTest["generatePdf"] = async ({
  html,
}) => {
  // const browser = await puppeteer.launch();

  // Start Playwright with the dynamic chrome-aws-lambda args
  const browser = await playwright.chromium.launch({
    args: chromium.args,
    executablePath:
      process.env.NODE_ENV !== "development"
        ? await chromium.executablePath
        : "/usr/bin/chromium",
    headless: process.env.NODE_ENV !== "development" ? chromium.headless : true,
  });

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
