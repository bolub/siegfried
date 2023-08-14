import { type DoppioTypes } from "@/server/modules/doppio-adapter/interface";
import axios from "axios";

export const generatePdf: DoppioTypes["generatePdf"] = async ({
  encodedHTML,
}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer 43627a1b192f18e666b51c1d`,
  };

  try {
    const response = await axios.post(
      "https://api.doppio.sh/v1/render/pdf/sync",
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
