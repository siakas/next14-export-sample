import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  isExporting: boolean;
  startExport: () => Promise<void>;
};

export const ExportButton = ({ isExporting, startExport }: Props) => {
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
