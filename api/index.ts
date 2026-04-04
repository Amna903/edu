import type { VercelRequest, VercelResponse } from "@vercel/node";
import { app, ready } from "../server/index.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ready;
  return app(req, res);
}
