import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const sarabun = Sarabun({
  weight: ["400", "700"],
  subsets: ["latin", "thai"]
});

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: "Group135 Frontend",
  description: "someone changed the group name to something uncool :("
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head></head>
      <body className={sarabun.className}>
        <NextAuthProvider session={nextAuthSession}>
          <Header />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
