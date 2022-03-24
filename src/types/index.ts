export type CardType = 'letter' | 'icon';
type Level = 'EASY' | 'MEDIUM' | 'HARD';

export interface GameDifficulty {
  value: Level
  size: number
}

export interface Card {
  type: CardType | null
  value: string
  flipped: boolean
  found: boolean
}

export interface FlashyGame {
  time: number
  difficulty: GameDifficulty | null
  moves: number
  cardType: CardType | null
  date?: string
}

export interface ActiveGameStats {
  deck: Array<Card>
  game: FlashyGame
}

