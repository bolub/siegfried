export interface PdfServiceType {
  generatePdf: (args: {
    html: string;
    user: { id: string };
    pdfName: string;
  }) => Promise<{
    pdfPath: string;
  }>;
}
