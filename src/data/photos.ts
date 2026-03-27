export interface MediaItem {
  src: string;
  type: 'image' | 'video';
  caption: string;
}

const b = import.meta.env.BASE_URL;

// Ordenado cronologicamente pela data no nome do arquivo
export const mediaItems: MediaItem[] = [
  { src: `${b}VID-AMR.mp4`,                type: 'video', caption: 'Nós dois'         },
  { src: `${b}IMG-20220926-WA0012.jpg`,     type: 'image', caption: 'Começo de tudo'   }, // 26/09/2022 — 2 dias depois de namorar
  { src: `${b}IMG-20221105-WA0027.jpg`,     type: 'image', caption: 'Prometidos'       }, // 05/11/2022
  { src: `${b}SAVE_20230101_010535.jpg`,    type: 'image', caption: 'Meu ano inteiro'  }, // 01/01/2023 às 00:05
  { src: `${b}IMG-20230219-WA0016.jpg`,     type: 'image', caption: 'Só nós dois'      }, // 19/02/2023
  { src: `${b}IMG-20230219-WA0026.jpg`,     type: 'image', caption: 'Sempre assim'     }, // 19/02/2023
  { src: `${b}IMG-20240108-WA0017.jpg`,     type: 'image', caption: 'Nosso jeito'      }, // 08/01/2024
  { src: `${b}IMG-20241222-WA0039.jpg`,     type: 'image', caption: 'O presente que importa' }, // 22/12/2024
  { src: `${b}IMG-20250420-WA0012.jpg`,     type: 'image', caption: 'Pra sempre'       }, // 20/04/2025
  { src: `${b}IMG-20250420-WA0016.jpg`,     type: 'image', caption: 'Sempre juntos'    }, // 20/04/2025
];
