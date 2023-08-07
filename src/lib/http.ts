import type { NextApiRequest, NextApiResponse } from "next";
import { type Session } from "next-auth";
import { getSession } from "next-auth/react";

export function handlePost(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: () => void
) {
  if (req.method === "POST") {
    handler();
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}

export const handleHTTPRequestWithSession = async (
  method: "POST" | "GET",
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (args: {
    session: Session;
    req: NextApiRequest;
    res: NextApiResponse;
  }) => void
) => {
  if (req.method === method) {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized." });
    } else {
      handler({ session, req, res });
    }
  } else {
    res.setHeader("Allow", [method]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};

export function handlePostWithSession(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (session: Session) => void
) {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  handlePost(req, res, async () => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized." });
    } else {
      handler(session);
    }
  });
}
