import { NextResponse } from 'next/server'
import { getGames, getGame, createGame, getQuestionCategories } from '@/services/trivia';

export const maxDuration = 5; // This function can run for a maximum of 5 seconds

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










// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
  })
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}


const encoder = new TextEncoder()
 
async function* makeIterator() {
  for (let i = 0; i < 100; i++) {
    console.log('>> app.api.trivia.games.POST iterator iteratin\'', i);
    yield encoder.encode(`<p>${i}</p>
`);
      await sleep(1000);
    }
}

export async function POST(request: Request) {
  console.log('>> app.api.trivia.games.POST', request);
  // const data: any = await request.json();
  // const categories = data.categories && data.categories.split(/\s*,\s*/)
  // const game = await createGame(data.createdBy, data.numQuestions, data.name, categories);
  // return NextResponse.json({ game });


  const iterator = makeIterator()
  const stream = iteratorToStream(iterator)
 
  return new Response(stream)  
}
