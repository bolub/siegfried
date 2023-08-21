export interface PdfServiceTypeTest {
  generatePdf: (args: { html: string }) => Promise<{
    pdfPath: string;
  }>;
}
