import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "FlowVault | Deterministic Workflow & Secret Orchestration",
  description: "Audit, version, and deploy automated API workflows with zero configuration drift.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-slate-950 text-slate-100 antialiased font-sans selection:bg-blue-600 selection:text-white">
        <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-md bg-blue-600 flex items-center justify-center font-mono text-xs font-bold text-white">
                FV
              </div>
              <Link href="/" className="text-lg font-semibold tracking-tight text-white">
                FlowVault
              </Link>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                v2.4
              </span>
            </div>

            <nav className="flex items-center gap-6">
              <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors"
              >
                Open Workspace
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}