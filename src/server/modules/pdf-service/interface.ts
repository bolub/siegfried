export interface PdfServiceType {
  generatePdf: (args: { html: string }) => Promise<{
    url: string;
  }>;
}
