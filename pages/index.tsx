import localFont from "next/font/local";
import { ExportButton } from "@/components/ExportButton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useExport } from "@/hooks/useExport";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const { progress, isExporting, startExport } = useExport();

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} relative`}>
      <Progress
        value={progress}
        className={cn(
          "absolute left-0 top-0 h-1 w-full opacity-0",
          isExporting && "opacity-100",
        )}
      />
      <div className="flex min-h-[350px] w-full items-center justify-center p-10">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Export</CardTitle>
            <CardDescription>
              Clicking the button will start the export and save the file.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <ExportButton isExporting={isExporting} startExport={startExport} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
