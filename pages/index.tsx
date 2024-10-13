import localFont from "next/font/local";
import { ExportButton } from "@/components/ExportButton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <div className="flex min-h-[350px] w-full items-center justify-center p-10">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Export</CardTitle>
            <CardDescription>
              Clicking the button will start the export and save the file.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <ExportButton />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
