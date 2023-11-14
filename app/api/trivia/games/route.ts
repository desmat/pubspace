import { NextResponse } from 'next/server'
import { getGames, getGame, createGame } from '@/services/trivia';

export async function GET(request: Request) {
    console.log('>> app.api.trivia.games.GET');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const game = await getGame(id);
        return NextResponse.json({ game });   
    }

    const games = await getGames();
    return NextResponse.json({ games });
}

export async function POST(request: Request) {
    console.log('>> app.api.trivia.games.POST', request);
    const data: any = await request.json();
    const game = await createGame(data.numQuestions, data.name, data.categories);
    return NextResponse.json({ game });
}
