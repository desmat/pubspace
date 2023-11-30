import { NextResponse } from 'next/server'
import { getGame, deleteGame } from '@/services/trivia';
import { validateUserSession } from '@/services/users';

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
    const { user } = await validateUserSession(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'authentication failed' },
        { status: 401 }
      );
    } 
  
    if (!params.id) {
        throw `Cannot delete trivia game with null id`;
    }

    const game = await deleteGame(params.id, user);
    return NextResponse.json({ game });
}
