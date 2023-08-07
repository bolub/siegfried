export interface PdfServiceType {
  generatePdf: (args: { dynamicHTML: string }) => Promise<{
    pdfFilePath: string;
  }>;
}
