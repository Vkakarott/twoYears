export interface Declaration {
  text: string;
  author: string;
  source?: string;
}

export const declarations: Declaration[] = [
  {
    text:   'Seja qual for a matéria de que as nossas almas são feitas, a minha e a dele são iguais.',
    author: 'Emily Brontë',
    source: 'O Morro dos Ventos Uivantes, 1847',
  },
  {
    text:   'Pode partir meu coração mil vezes se desejar — ele sempre foi seu para fazer o que quiser. Amarei você até meu último suspiro, não quero morrer sem que você saiba disso.',
    author: 'Kiera Cass',
  },
  {
    text:   'No meio do inverno, descobri que havia, dentro de mim, um verão invencível.',
    author: 'Albert Camus',
  },
  {
    text:   'Always.',
    author: 'Severus Snape',
  },
];
