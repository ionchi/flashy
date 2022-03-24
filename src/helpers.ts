import type { CardType, FlashyGame, GameDifficulty, ActiveGameStats } from "@/types";

const icons = [
	'alpaca',
	'bag',
	'barber',
	'baseball-hat',
	'boot',
	'bow-tie',
	'bull',
	'butterfly',
	'cat',
	'cat-footprint',
	'certificate',
	'chef-hat',
	'chicken',
	'clock',
	'comb',
	'cow',
	'crab',
	'detective-hat',
	'diamond',
	'diamond-ring',
	'dog',
	'dryer',
	'duck',
	'fenix',
	'flip-flops',
	'frog',
	'glove',
	'hanger',
	'kitty',
	'lemur',
	'lipstick',
	'lock-ness',
	'pig',
	'pocket-watch',
	'ring',
	'santa-hat',
	'scarf',
	'skirt',
	'sneakers',
	'sweater',
	't-shirt',
	'top-hat',
	'turtle',
	'umbrella',
	'unicorn',
	'whale',
	'witch'
];

const difficulties: GameDifficulty[] = [
  {
    value: 'EASY',
    size: 4
  },
  {
    value: 'MEDIUM',
    size: 6
  },
  {
    value: 'HARD',
    size: 8
  }
];

const getGameIcons = (length: number) => {
  const shuffled = [...icons].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, length);
};

const getGameLetters = (length: number) => {
  let index = 9;
  return [...Array(length)].map(() => (index += 1).toString(36).toUpperCase(), index);
};

export const getGameSymbols = (length: number, type: CardType) => {
  if (type === 'icon') {
    return getGameIcons(length);
  } else if (type === 'letter') {
    return getGameLetters(length);
  }
  return [];
};

export const getAvailableDifficulties = () => {
  return [...difficulties];
};

export const formatSeconds = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return [hours, minutes, seconds]
    .map(v => v < 10 ? "0" + v : v)
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString([], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
};

export const saveGameStats = (gameStats: FlashyGame[]) => {
  const encoded = JSON.stringify(gameStats);
  localStorage?.setItem('stats', encoded);
};

export const getGameStats = () => {
  const rawData = localStorage?.getItem('stats');
  return rawData ? JSON.parse(rawData) : [];
};

export const resetStats = () => {
  if (localStorage?.getItem('stats')) {
    localStorage.removeItem('stats');
  }
};

export const saveCurrentGame = (currentGame: ActiveGameStats) => {
  const encoded = JSON.stringify(currentGame);
  localStorage?.setItem('currentGame', encoded);
};

export const getCurrentGame = () => {
  const rawData = localStorage?.getItem('currentGame');
  return rawData ? JSON.parse(rawData) : null;
};

export const removeCurrentGame = () => {
  if (localStorage?.getItem('currentGame')) {
    localStorage.removeItem('currentGame');
  }
};
