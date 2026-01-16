import { getDictionary } from "./dictionaries";
import GameClient from "./GameClient";
import { Dictionary } from "@/types/game";

// Next.js 16 requiere que params sea una Promesa en el tipado de la página
interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: PageProps) {
  // 1. Resolvemos la promesa de los parámetros
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";
  
  // 2. Cargamos el diccionario (getDictionary debe ser async)
  const dict: Dictionary = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-[#05050a]">
      {/* Pasamos el diccionario tipado y el idioma al cliente. 
          GameClient ahora recibirá los datos procesados por el servidor.
      */}
      <GameClient dict={dict} lang={lang} />
    </main>
  );
}