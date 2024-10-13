import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import type { CheckStatusResponse } from "@/types/export";

// 進行中のエクスポートを管理するオブジェクト
const inProgressExports: { [key: string]: number } = {};

/**
 * エクスポートの進行状況をチェックし、レスポンスとして返します
 *
 * @param req - Next.js の API リクエストオブジェクト
 * @param res - Next.js の API レスポンスオブジェクト
 * @returns エクスポートの進行状況を含む JSON レスポンス
 */
export default function checkStatus(
  req: NextApiRequest,
  res: NextApiResponse<CheckStatusResponse | { error: string }>,
) {
  const { exportId } = req.query;

  // exportId が文字列でない場合はエラーレスポンスを返す
  if (typeof exportId !== "string") {
    return res.status(400).json({ error: "Invalid export ID" });
  }

  // exportId が inProgressExports に存在しない場合は初期化する
  if (!(exportId in inProgressExports)) {
    inProgressExports[exportId] = 0;
  }

  // リクエスト回数をインクリメント
  inProgressExports[exportId]++;

  // 3 回目のリクエストで完了したとみなす
  if (inProgressExports[exportId] >= 3) {
    delete inProgressExports[exportId];
    res.status(200).json({
      isCompleted: true,
      downloadUrl: "https://test.codeoff.net/sample.zip",
      expirationDate: dayjs().add(1, "day").toISOString(),
    });
  } else {
    // 完了していない場合のレスポンス
    res
      .status(200)
      .json({ isCompleted: false, downloadUrl: null, expirationDate: null });
  }
}
