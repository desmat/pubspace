import moment from 'moment';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Game } from "@/types/Trivia";
import { User } from 'firebase/auth';

const useTrivia: any = create(devtools((set: any, get: any) => ({
  games: [],
  categories: [],
  loaded: false,

  loadGames: async () => {
    console.log("*** hooks.trivia.loadGames");

    fetch('/api/trivia/games').then(async (res) => {
      if (res.status != 200) {
        console.error(`Error fetching trivia games: ${res.status} (${res.statusText})`);
        return;
      }

      const data = await res.json();
      set({
        games: data.games || [], 
        categories: data.categories || [], 
        loaded: true 
      });
    });
  },

  loadGame: async (id: string) => {
    console.log("*** hooks.trivia.loadGame", { id });

    fetch(`/api/trivia/games/${id}`).then(async (res) => {
      if (res.status != 200) {
        console.error(`Error fetching trivia games ${id}: ${res.status} (${res.statusText})`);
        set({ loaded: true });
        return;
      }

      const data = await res.json();
      // console.log(">> hooks.trivia.get: RETURNED FROM FETCH, returning!", { data });
      const game = data.game;
      const games = get().games.filter((g: Game) => g.id != id);
      set({ games: [...games, game], loaded: true });
    });
  },

  createGame: async (createdBy: string, numQuestions: number, name?: string, categories?: string[]) => {
    console.log("*** hooks.trivia.createGame", { createdBy, numQuestions, name, categories });

    const tempId = crypto.randomUUID();
    // const postedBy = posterName;
    // const postedByUID = posterUID;


    // optimistic game
    const game = {
      id: tempId,
      status: "generating",
      name,
      questions: new Array(numQuestions),
      optimistic: true,
    };

    // set optimistic game 
    set({ games: [...get().games, game] });

    fetch('/api/trivia/games', {
      method: "POST",
      body: JSON.stringify({ createdBy, numQuestions, name, categories }),
    }).then(async (res) => {
      if (res.status != 200) {
        console.error(`Error creating game: ${res.status} (${res.statusText})`);
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
  
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);      
        // console.warn(chunkValue);

        const splitValues = chunkValue?.trim()?.split("\n"); // status updates and game record as newline separated json strings
        const splitValue = splitValues[splitValues.length - 1];
        const jsonValue = splitValue && JSON.parse(splitValue);
        
        // console.log("*** hooks.trivia.createGame streaming from api", { doneReading, value, chunkValue, jsonValue });
        
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

    fetch(`/api/trivia/games/${id}`, {
      method: "DELETE",
    }).then(async (res) => {
      if (res.status != 200) {
        console.error(`Error deleting post ${id}: ${res.status} (${res.statusText})`);
        return;
      }
    });

    // optimistic
    const filteredGames = get().games.filter((game: Game) => game.id != id);
    set({ games: filteredGames });
  },

})));

export default useTrivia;
