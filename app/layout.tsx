import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GiMuscleUp } from "react-icons/gi";
import { H1 } from "@/components/Typography/H1";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Muscle up",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <div className="flex items-center p-4 gap-2 bg-black">
          <GiMuscleUp size={25} color="white" />
          <H1 label="Muscle up" />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
