import { getDictionary } from "./dictionaries";
import GameClient from "./GameClient";
import { Dictionary } from "@/types/game";

// Definimos el tipo de los params de la página
interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: PageProps) {
  // En Next.js 15, debemos esperar (await) a los params
  const { lang } = await params;
  
  // Como ya tipamos getDictionary antes, 'dict' aquí ya no es 'any'
  const dict: Dictionary = await getDictionary(lang);

  return (
    <main>
      {/* Si en GameClient decidiste quitar 'lang' porque no se usaba, 
          borra el atributo lang={lang} de aquí abajo.
      */}
      <GameClient dict={dict} lang={lang} />
    </main>
  );
}