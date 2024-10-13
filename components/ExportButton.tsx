import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { CheckStatusResponse, RequestIdResponse } from "@/types/export";

export const ExportButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = async () => {
    setIsExporting(true);
    setProgress(0);

    try {
      // エクスポート ID の取得
      const exportResponse = await fetch("/api/requestId");
      const { exportId } = (await exportResponse.json()) as RequestIdResponse;

      // ステータス確認のポーリング
      let isCompleted = false;
      while (!isCompleted) {
        const statusResponse = await fetch(
          `/api/checkStatus?exportId=${exportId}`,
        );
        const status = (await statusResponse.json()) as CheckStatusResponse;

        if (status.isCompleted) {
          isCompleted = true;
          // ダウンロード URL が利用可能になったらファイルをダウンロード
          if (status.downloadUrl) {
            window.location.href = status.downloadUrl;
          }
        } else {
          // プログレスバーの更新（この例では 33% ずつ増加）
          setProgress((prev) => Math.min(prev + 33, 99));
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 秒待機
        }
      }
    } catch (error) {
      console.error("Error failed:", error);
    } finally {
      setIsExporting(false);
      setProgress(100);
    }
  };

  return (
    <div>
      <Button
        className="font-bold"
        onClick={handleExport}
        disabled={isExporting}
      >
        {isExporting ? <Loader2 className="size-4 animate-spin" /> : "Export"}
      </Button>

      <Progress value={progress} className="mt-1 h-1" />
    </div>
  );
};
