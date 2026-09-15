import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { ResumeProvider } from "@/lib/resume-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apply Kit — Jack Gee",
  description:
    "Career toolkit: JD fit gap, resume advisor, cover letter helper, and interview prep. Shared resume context. Drafting assist only.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ResumeProvider>
          <AppShell>{children}</AppShell>
        </ResumeProvider>
      </body>
    </html>
  );
}
