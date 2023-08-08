export interface PdfServiceType {
  generatePdf: (args: { html: string }) => Promise<{
    pdfFilePath: string;
  }>;
}
