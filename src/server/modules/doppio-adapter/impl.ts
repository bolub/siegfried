import { env } from "@/env.mjs";
import { type DoppioTypes } from "@/server/modules/doppio-adapter/interface";
import axios from "axios";

export const generatePdf: DoppioTypes["generatePdf"] = async ({
  encodedHTML,
}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${env.DOPPIO_AUTH_TOKEN}`,
  };

  try {
    const response = await axios.post(
      env.DOPPIO_URL,
      {
        page: {
          pdf: { printBackground: true, format: "A4" },
          setContent: {
            html: encodedHTML,
          },
        },
      },

      {
        headers,
      }
    );

    return {
      pdfData: response.data.documentUrl,
    };
  } catch (error) {
    console.log(error);
    return {
      pdfData: undefined,
    };
  }

  // const data = response.json();
};

export const Doppio: DoppioTypes = {
  generatePdf,
};
