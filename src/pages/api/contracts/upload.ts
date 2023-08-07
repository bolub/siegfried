/* eslint-disable */

import type { NextApiRequest, NextApiResponse } from "next";
import { handlePost, handlePostWithSession } from "@/lib/http";

import { FileStorageService } from "@/server/modules/file-storage-service/impl";
import { env } from "@/env.mjs";
import fs from "fs";

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
  data?: any;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  handlePost(req, res, async () => {
    let { filePath } = req.body;

    const fileData = fs.readFileSync(filePath);

    try {
      const resp = await FileStorageService.upload({
        bucket: env.SUPABASE_CONTRACTS_BUCKET,
        path: "user_contract",
        file: fileData,
        opts: {
          contentType: "application/pdf",
        },
      });

      return res.status(200).json({ message: "ok", data: { ...resp } });
    } catch (error) {
      return res.status(500).json({ message: "ok", data: error });
    }
  });
}
