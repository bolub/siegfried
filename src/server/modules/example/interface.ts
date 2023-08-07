export interface ExampleTypes {
  testEmailSending: () => Promise<string>;
  generatePdf: (args: { dynamicHTML: string }) => Promise<string>;
}
