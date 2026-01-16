import type { Metadata } from "next";
import { Press_Start_2P } from 'next/font/google';
import "./globals.css";

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel', 
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Tetris Arcade",
  description: "Classic Tetris experience with Next.js",
};

// La clave es hacer que lang sea OPCIONAL (?) 
// porque en la raíz "/" params viene vacío "{}"
interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>; 
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  
  // Esperamos los parámetros
  const resolvedParams = await params;
  
  // Si lang no viene (en la raíz), usamos "en" por defecto
  const lang = resolvedParams?.lang || "en";
  
  return (
    <html lang={lang}> 
      <body className={`${pixelFont.variable} font-sans antialiased bg-[#05050a]`}>
        {children}
      </body>
    </html>
  );
}