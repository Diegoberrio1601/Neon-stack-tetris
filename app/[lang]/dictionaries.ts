import { Dictionary } from "@/types/game";

const dictionaries = {
  // Forzamos a que el import devuelva una promesa de tipo Dictionary
  en: () => import('@/dictionaries/en.json').then((module) => module.default as Dictionary),
  es: () => import('@/dictionaries/es.json').then((module) => module.default as Dictionary),
}

// Tipamos el retorno de la función como Promise<Dictionary>
export const getDictionary = async (lang: string): Promise<Dictionary> => {
  // Si lang no es 'es', forzamos 'en'
  const locale = lang === 'es' ? 'es' : 'en';
  return dictionaries[locale]();
}