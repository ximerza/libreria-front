import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Lectura - Librería App",
  description: "App para gestionar lecturas y clubs de lectura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
