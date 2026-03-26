import StoreProvider from "./StoreProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css"
import { toast } from "sonner";
import { Toaster } from "sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <StoreProvider>
          <TooltipProvider>
             {children}
             <Toaster position="top-right" richColors />
          </TooltipProvider>
        </StoreProvider>
      </body>
    </html>
  );
}