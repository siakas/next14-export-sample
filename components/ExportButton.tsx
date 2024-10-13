import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExport } from "@/hooks/useExport";

export const ExportButton = () => {
  const { isExporting, startExport } = useExport();

  return (
    <div>
      <Button
        className="font-bold"
        onClick={startExport}
        disabled={isExporting}
      >
        {isExporting ? <Loader2 className="size-4 animate-spin" /> : "Export"}
      </Button>
    </div>
  );
};
