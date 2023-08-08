export interface PdfServiceType {
  generatePdf: (args: { html: string; name?: string }) => Promise<{
    pdfFilePath: string;
  }>;
}
