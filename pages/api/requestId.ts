import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import type { RequestIdResponse } from "@/types/export";

/**
 * リクエストに対して一意のIDを生成し、レスポンスとして返します
 *
 * @param req - Next.js の API リクエストオブジェクト
 * @param res - Next.js の API レスポンスオブジェクト
 * @returns 生成された一意の ID を含む JSON レスポンス
 */
export default function requestId(
  req: NextApiRequest,
  res: NextApiResponse<RequestIdResponse>,
) {
  const exportId = uuidv4();
  res.status(200).json({ exportId });
}
