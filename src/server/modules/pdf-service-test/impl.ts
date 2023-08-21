import path from "path";
import { type PdfServiceTypeTest } from "./interface";
import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export const generatePdf: PdfServiceTypeTest["generatePdf"] = async ({
  html,
}) => {
  const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath:
          process.platform === "win32"
            ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "linux"
            ? "/usr/bin/google-chrome"
            : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      };

  // Start Playwright with the dynamic chrome-aws-lambda args
  const browser = await puppeteer.launch(options);

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
