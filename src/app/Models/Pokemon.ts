export default class Pokemon {
  name: string;
  level: number;
  order: number;
  moves: string[] = [];
  constructor(name: string, level: number, order: number, moves: string[]) {
    this.name = name;
    this.level = level;
    this.order = order;
    this.moves = moves;
  }
}
