import { handlePost } from "@/lib/http";

import { FileStorageService } from "@/server/modules/file-storage-service/impl";
import { env } from "@/env.mjs";
import fs from "fs";
import { type NextApiRequest, type NextApiResponse } from "next";

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
    let { filePath, pdfName, userId } = req.body;

    const fileData = fs.readFileSync(filePath);

    const path = `${userId}/${pdfName}_${Date.now()}`;

    try {
      const resp = await FileStorageService.upload({
        bucket: env.SUPABASE_CONTRACTS_BUCKET,
        path,
        file: fileData,
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
