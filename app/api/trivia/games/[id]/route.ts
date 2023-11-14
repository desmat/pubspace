import { NextResponse } from 'next/server'
import { getGame, deleteGame } from '@/services/trivia';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    console.log('>> app.api.trivia.games.[id].GET', params);

    const game = await getGame(params.id);
    if (!game) {
        return NextResponse.json({ game: {} }, { status: 404 });
    }
    
    return NextResponse.json({ game });
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    console.log('>> app.api.trivia.games.DELETE params', params);

    if (!params.id) {
        throw `Cannot delete trivia game with null id`;
    }

    const game = await deleteGame(params.id);
    return NextResponse.json({ game });
}
