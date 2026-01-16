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

// 1. Corregimos la interfaz: params ahora es una Promise
interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; 
}

// 2. Convertimos el componente en asíncrono (async)
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  
  // 3. Esperamos a que la promesa de params se resuelva
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";
  
  return (
    <html lang={lang}> 
      <body className={`${pixelFont.variable} font-sans antialiased bg-[#05050a]`}>
        {children}
      </body>
    </html>
  );
}