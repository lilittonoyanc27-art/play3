export interface BattleWord {
  spanish: string; // "el gato"
  armenian: string; // "կատուն"
  options: string[]; // ["el gato", "la gata", "el perro"]
}

export const BATTLE_WORDS: BattleWord[] = [
  { spanish: "el gato", armenian: "կատուն", options: ["el gato", "la gata", "el perro", "la mesa"] },
  { spanish: "la mesa", armenian: "սեղանը", options: ["la mesa", "el mesa", "la silla", "el libro"] },
  { spanish: "el sol", armenian: "արևը", options: ["el sol", "la sol", "el cielo", "la luna"] },
  { spanish: "la flor", armenian: "ծաղիկը", options: ["la flor", "el flor", "la planta", "el árbol"] },
  { spanish: "el libro", armenian: "գիրքը", options: ["el libro", "la libra", "el cuaderno", "la hoja"] },
  { spanish: "la silla", armenian: "աթոռը", options: ["la silla", "el sillón", "la mesa", "el taburete"] },
  { spanish: "el perro", armenian: "շունը", options: ["el perro", "la perra", "el lobo", "el gato"] },
  { spanish: "la ventana", armenian: "պատուհանը", options: ["la ventana", "el ventano", "la puerta", "el balcón"] },
  { spanish: "el coche", armenian: "մեքենան", options: ["el coche", "la cocha", "el bus", "el tren"] },
  { spanish: "la casa", armenian: "տունը", options: ["la casa", "el caso", "la calle", "el edificio"] },
  { spanish: "el agua", armenian: "ջուրը", options: ["el agua", "la agua", "el río", "la mar"] },
  { spanish: "la manzana", armenian: "խնձորը", options: ["la manzana", "el manzano", "la naranja", "el plátano"] },
  { spanish: "el pan", armenian: "հացը", options: ["el pan", "la pan", "el queso", "la mantequilla"] },
  { spanish: "la leche", armenian: "կաթը", options: ["la leche", "el leche", "el zumo", "la cafetera"] },
  { spanish: "el queso", armenian: "պանիրը", options: ["el queso", "la quesa", "el jamón", "el pan"] },
  { spanish: "la puerta", armenian: "դուռը", options: ["la puerta", "el puerto", "la ventana", "el muro"] },
  { spanish: "el reloj", armenian: "ժամացույցը", options: ["el reloj", "la reloja", "el tiempo", "la mano"] },
  { spanish: "la calle", armenian: "փողոցը", options: ["la calle", "el callo", "la plaza", "el parque"] },
  { spanish: "el niño", armenian: "տղան", options: ["el niño", "la niña", "el hombre", "la mujer"] },
  { spanish: "la niña", armenian: "աղջիկը", options: ["la niña", "el niño", "la mujer", "el chico"] }
];
