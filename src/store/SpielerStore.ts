import { defineStore } from 'pinia';

interface Player {
  name: string;
}

export const useSpielerStore = defineStore('playerStore', {
  state: () => ({
    players: [] as Player[],
    counter: 0,
    sips: 0,
  }),
  actions: {
    addPlayer(player: Player) {
      this.players.push(player);
    },
    removePlayer(index: number) {
      this.players.splice(index, 1);
    },
    resetPlayers() {
      this.players = [];
      this.counter = 0;
      this.sips = 0;
    }
  }
});

