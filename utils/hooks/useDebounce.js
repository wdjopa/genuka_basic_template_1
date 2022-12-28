import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
  // Déclarez une nouvelle variable d'état, qui va servir de délai
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Mettre en place un timer qui va mettre à jour la valeur débouncée
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Défaire le timer lorsque le composant se démonte
      return () => {
        clearTimeout(handler);
      };
    },
    // Assurez-vous de ne mettre à jour la valeur débouncée que lorsque
    // la valeur d'origine change. Sinon, vous pourriez boucler indéfiniment.
    [value]
  );

  return debouncedValue;
}
