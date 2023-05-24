import { defineStore } from 'pinia';

interface Player {
  name: string;
}

export const useSpielerStore = defineStore('playerStore', {
  state: () => ({
    players: [] as Player[]
  }),
  actions: {
    addPlayer(player: Player) {
      this.players.push(player);
    },
    removePlayer(index: number) {
      this.players.splice(index, 1);
    }
  }
});

