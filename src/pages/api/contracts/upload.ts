import { handlePost } from "@/lib/http";

import { FileStorageService } from "@/server/modules/file-storage-service/impl";
import { env } from "@/env.mjs";
import { type NextApiRequest, type NextApiResponse } from "next";
import { z } from "zod";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: 10485760,
    },
  },
};

interface Data {
  message?: string;
  id?: string;
  data: string;
}

async function blobToBuffer(blob: Blob) {
  try {
    // Create a response object from the Blob
    const response = await fetch(URL.createObjectURL(blob));

    // Read the response as an ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();

    // Convert the ArrayBuffer to a Buffer (if you're using Node.js)
    const buffer = Buffer.from(arrayBuffer);

    return buffer;
  } catch (error: any) {
    throw new Error("Error converting Blob to Buffer: " + error?.message);
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  handlePost(req, res, async () => {
    const UploadSchema = z.object({
      filePath: z.string().min(1),
      pdfName: z.string().min(1),
      userId: z.string().min(1),
    });

    let { filePath, pdfName, userId } = UploadSchema.parse(req.body);

    const path = `${userId}/${pdfName}_${Date.now()}`;

    const blobData = await fetch(filePath).then((r) => r.blob());
    const bufferData = await blobToBuffer(blobData);

    try {
      const resp = await FileStorageService.upload({
        bucket: env.SUPABASE_CONTRACTS_BUCKET,
        path,
        file: bufferData,
        opts: {
          contentType: "application/pdf",
        },
      });

      return res.status(200).json({ message: "ok", data: resp.path });
    } catch (error: any) {
      console.log("Error uploading file: " + error?.message);

      return res
        .status(500)
        .json({ message: "Something happened", data: JSON.stringify(error) });
    }
  });
}
