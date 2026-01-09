import { Injectable } from "@nestjs/common";


interface Player {
  id: string;
  x: number;
  y: number;
}
@Injectable()
export class GameService {
  private players: Map<string, Player> = new Map();

  addPlayer(id: string, playerData: Player) {
    this.players.set(id, playerData);
  }

  removePlayer(id: string) {
    this.players.delete(id);
  }

  getPlayer(id:string){
    return this.players.get(id);
  }

  updatePlayer(id: string, x: number, y: number) {
    if(this.players.has(id)){
      const player = this.players.get(id)!;
      player.x = x;
      player.y = y;
    }
  }

  getAllPlayers() {
    return Array.from(this.players.values());
  }
}