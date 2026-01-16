import type { Metadata } from "next";
import { Press_Start_2P } from 'next/font/google';
import "./globals.css";

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel', 
  display: 'swap', // Mejora el rendimiento de carga
});

export const metadata: Metadata = {
  title: "Tetris Arcade",
  description: "Classic Tetris experience with Next.js",
};

// Definimos la interfaz para los props del layout
interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  // Nota: En layouts de Next 15, params puede ser síncrono o promesa.
  // Si usas Next 15, es mejor dejar que 'lang' venga de la URL directamente.
  
  return (
    <html lang={params?.lang || "en"}> 
      <body className={`${pixelFont.variable} font-sans antialiased bg-[#05050a]`}>
        {children}
      </body>
    </html>
  );
}