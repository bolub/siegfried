export interface DoppioTypes {
  generatePdf: (args: { encodedHTML: string }) => Promise<{ pdfData: any }>;
}
