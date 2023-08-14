import { env } from "@/env.mjs";
import {
  type DoppioTypes,
  DoppioSchema,
} from "@/server/modules/doppio-adapter/interface";
import axios from "axios";

export const generatePdf: DoppioTypes["generatePdf"] = async ({
  encodedHTML,
}) => {
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.DOPPIO_AUTH_TOKEN}`,
        },
      }
    );

    return {
      pdfData: DoppioSchema.parse(response.data).documentUrl,
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
