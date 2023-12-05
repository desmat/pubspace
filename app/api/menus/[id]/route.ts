import { NextResponse } from 'next/server'
import { getMenu, deleteMenu } from '@/services/menus';
import { validateUserSession } from '@/services/users';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    console.log('>> app.api.menu.[id].GET', { params });

    const menu = await getMenu(params.id);
    if (!menu) {
        return NextResponse.json({ menu: {} }, { status: 404 });
    }
    
    return NextResponse.json({ menu });
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    console.log('>> app.api.menu.DELETE', { params });
    const { user } = await validateUserSession(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'authentication failed' },
        { status: 401 }
      );
    } 
  
    if (!params.id) {
        throw `Cannot delete menu with null id`;
    }

    const game = await deleteMenu(user, params.id);
    return NextResponse.json({ game });
}
