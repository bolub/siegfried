import { z } from "zod";
import { type PdfServiceType } from "./interface";
import axios from "axios";

const ResponseSchema = z.object({
  data: z.string(),
});

export const generatePdf: PdfServiceType["generatePdf"] = async ({
  html,
  user,
  pdfName,
}) => {
  try {
    const response = await axios.post(
      `https://siegfried-pdf-generation.netlify.app/api/generate`,
      {
        html,
        pdfName,
        userId: user.id,
      }
    );

    return {
      pdfPath: ResponseSchema.parse(response.data).data,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't generate pdf");
  }
};

export const PdfService: PdfServiceType = {
  generatePdf,
};
