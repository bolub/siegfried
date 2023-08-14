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

    const blob = await fetch(filePath).then((r) => r.blob());

    try {
      const resp = await FileStorageService.upload({
        bucket: env.SUPABASE_CONTRACTS_BUCKET,
        path,
        file: blob,
        opts: {
          contentType: "application/pdf",
        },
      });

      return res.status(200).json({ message: "ok", data: resp.path });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: "ok", data: JSON.stringify(error) });
    }
  });
}
