export interface TimelineEvent {
  date: string;        // ISO para ordenar
  label: string;       // data exibida
  title: string;
  emoji: string;
  anniversary?: number; // preencher apenas nos dias 24/09
}

// Para adicionar novos eventos, basta inserir um objeto nessa lista.
// A ordem não importa — o componente ordena por `date` automaticamente.
export const timeline: TimelineEvent[] = [
  {
    date:  '2022-08-28',
    label: '28 de agosto de 2022',
    title: 'A gente se conheceu',
    emoji: '👋',
  },
  {
    date:  '2022-09-03',
    label: '03 de setembro de 2022',
    title: 'Me descobri apaixonado',
    emoji: '💘',
  },
  {
    date:  '2022-09-24',
    label: '24 de setembro de 2022',
    title: 'Nos vimos pela primeira vez — e começamos a namorar',
    emoji: '🌹',
    anniversary: 0,
  },
  {
    date:  '2022-09-25',
    label: '25 de setembro de 2022',
    title: 'Nos despedimos pela primeira vez',
    emoji: '🔐',
  },
  {
    date:  '2022-11-05',
    label: '05 de novembro de 2022',
    title: 'Compramos as alianças',
    emoji: '💍',
  },
  {
    date:  '2022-12-03',
    label: '03 de dezembro de 2022',
    title: 'Primeira saída só nós dois',
    emoji: '🌆',
  },
  {
    date:  '2022-12-04',
    label: '04 de dezembro de 2022',
    title: 'Conheci minha sogra',
    emoji: '🤝',
  },
  {
    date:  '2022-12-24',
    label: '24 de dezembro de 2022',
    title: 'Primeiro Natal juntos',
    emoji: '🎄',
  },
  {
    date:  '2022-12-31',
    label: '31 de dezembro de 2022',
    title: 'Primeiro Réveillon juntos',
    emoji: '🎆',
  },
  {
    date:  '2023-08-26',
    label: '26 de agosto de 2023',
    title: 'Primeiro dia sem se falar',
    emoji: '🌧️',
  },
  {
    date:  '2023-09-24',
    label: '24 de setembro de 2023',
    title: '1 ano juntos',
    emoji: '🥂',
    anniversary: 1,
  },
  {
    date:  '2023-12-01',
    label: '01 de dezembro de 2023',
    title: 'Primeiro aniversário dela juntos',
    emoji: '🎂',
  },
  {
    date:  '2024-04-21',
    label: '21 de abril de 2024',
    title: 'Primeiro festival de anime juntos',
    emoji: '🎌',
  },
  {
    date:  '2024-09-24',
    label: '24 de setembro de 2024',
    title: '2 anos juntos',
    emoji: '🥂',
    anniversary: 2,
  },
  {
    date:  '2024-12-02',
    label: '02 de dezembro de 2024',
    title: 'Nicolândia',
    emoji: '🎡',
  },
  {
    date:  '2025-09-24',
    label: '24 de setembro de 2025',
    title: '3 anos juntos',
    emoji: '🥂',
    anniversary: 3,
  },
  {
    date:  '2025-10-05',
    label: '05 de outubro de 2025',
    title: 'Primeira vez no parque aquático',
    emoji: '🌊',
  },
];

export const sortedTimeline = [...timeline].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);
