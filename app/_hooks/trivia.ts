import moment from 'moment';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Game } from "@/types/Trivia";
import { uuid } from '@/utils/misc';
import useAlert from './alert';

const useTrivia: any = create(devtools((set: any, get: any) => ({
  games: [],
  deletedGames: [], // to smooth out visual glitches when deleting
  categories: [],
  loaded: false,

  loadGames: async () => {
    console.log("*** hooks.trivia.loadGames");

    fetch('/api/trivia/games').then(async (res) => {
      if (res.status != 200) {
        useAlert.getState().error(`Error fetching trivia games: ${res.status} (${res.statusText})`);
        return;
      }

      const data = await res.json();
      const deleted = get().deletedGames.map((game: Game) => game.id);

      set({
        games: data.games.filter((game: Game) => !deleted.includes(game.id)),
        categories: data.categories,
        loaded: true 
      });
    });
  },

  loadGame: async (id: string) => {
    console.log("*** hooks.trivia.loadGame", { id });

    fetch(`/api/trivia/games/${id}`).then(async (res) => {
      if (res.status != 200) {
        useAlert.getState().error(`Error fetching trivia games ${id}: ${res.status} (${res.statusText})`);
        set({ loaded: true });
        return;
      }

      const data = await res.json();
      // console.log(">> hooks.trivia.get: RETURNED FROM FETCH, returning!", { data });
      const game = data.game;
      const games = get().games.filter((game: Game) => game.id != id);
      set({ games: [...games, game], loaded: true });
    });
  },

  createGame: async (createdBy: string, numQuestions: number, name?: string, categories?: string[]) => {
    console.log("*** hooks.trivia.createGame", { createdBy, numQuestions, name, categories });

    // optimistic game
    const tempId = uuid();
    const game = {
      id: tempId,
      createdBy,
      createdAt: moment().valueOf(),
      status: "generating",
      name,
      questions: new Array(numQuestions),
      optimistic: true,
    };
    set({ games: [...get().games, game] });

    fetch('/api/trivia/games', {
      method: "POST",
      body: JSON.stringify({ createdBy, numQuestions, name, categories }),
    }).then(async (res) => {
      if (res.status != 200) {
        useAlert.getState().error(`Error creating game: ${res.status} (${res.statusText})`);
        const games = get().games.filter((game: Game) => game.id != tempId);
        set({ games });
      }

      const data = res.body;
      if (!data) {
        return;
      }
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let chunkValues = "";
  
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        chunkValues += chunkValue;
        const splitValues = chunkValues.trim().split(/\n+/);
        const splitValue = splitValues[splitValues.length - 1].trim();

        // console.warn("*** hooks.trivia.createGame streaming from api", { doneReading, value, chunkValue, chunkValues, splitValue });

        try {
          const jsonValue = splitValue && JSON.parse(splitValue);
          // console.warn("*** hooks.trivia.createGame streaming from api", { splitValue, jsonValue });
          
          if (jsonValue && jsonValue.status) {
            // update game status
            const games = get().games.filter((game: Game) => game.id != tempId);
            game.status = `${jsonValue.status}...`;
            set({ games: [...games, game] });
          }

          if (jsonValue && jsonValue.game) {
            // remove optimistic game and replace with created game from backend
            const games = get().games.filter((game: Game) => game.id != tempId);
            set({ games: [...games, jsonValue.game] });
            done = true;
          }
        } catch (error) {
          useAlert.getState().error("Unable to parse json", { error, chunkValue })
        }
      }
    });
  },

  editGame: async (id: string) => {
    console.log("*** hooks.trivia.editGame", {});
    // TODO
  },

  deleteGame: async (id: string) => {
    console.log("*** hooks.trivia.deleteGame", { id });

    if (!id) {
      throw `Cannot delete post with null id`;
    }

    const { games, deletedGames } = get();

    // optimistic
    set({
      games: games.filter((game: Game) => game.id != id),
      deletedGames: [...deletedGames, games.filter((game: Game) => game.id == id)[0]],
    });

    fetch(`/api/trivia/games/${id}`, {
      method: "DELETE",
    }).then(async (res) => {
      if (res.status != 200) {
        useAlert.getState().error(`Error deleting post ${id}: ${res.status} (${res.statusText})`);
        set({ games, deletedGames });
        return;
      }

      set({ deletedGames: deletedGames.filter((game: Game) => game.id == id) });
    });
  },

})));

export default useTrivia;
