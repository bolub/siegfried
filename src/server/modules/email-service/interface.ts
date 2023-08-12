import { type ReactElement } from "react";

interface Attachment {
  content: Buffer | string;
  filename: string;
}

export interface EmailServiceTypes {
  send: (args: {
    to: string | string[];
    subject: string;
    content: ReactElement;
    attachments?: Attachment[];
  }) => Promise<void>;
}
