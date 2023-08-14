import { z } from "zod";

export const DoppioSchema = z.object({
  documentUrl: z.string().min(1),
});
export interface DoppioTypes {
  generatePdf: (args: {
    encodedHTML: string;
  }) => Promise<{ pdfData: string | undefined }>;
}
