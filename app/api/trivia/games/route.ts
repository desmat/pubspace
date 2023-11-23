// export const maxDuration = 300;
// export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server'
import { getGames, getGame, createGame, getQuestionCategories } from '@/services/trivia';

export async function GET(request: Request) {
  console.log('>> app.api.trivia.games.GET');
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const game = await getGame(id);
    return NextResponse.json({ game });
  }

  const [games, categories] = await Promise.all([getGames(), getQuestionCategories()]);
  return NextResponse.json({ games, categories });
}

export async function POST(request: Request) {
  console.log('>> app.api.trivia.games.POST', request);
  const data: any = await request.json();
  const categories = data.categories && data.categories.split(/\s*,\s*/);
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async pull(controller) {
      // const game = await createGamePromise;
      const handleStatusUpdate = (status: string) => {
        controller.enqueue(encoder.encode(JSON.stringify({ status })));
      }      

      const game = await createGame(data.createdBy, data.numQuestions, data.name, categories, handleStatusUpdate);
      // console.log("game in stream pull", { game });
      controller.enqueue(encoder.encode(JSON.stringify({ game })));
      controller.close();
    },
  })

  return new Response(stream)
}
