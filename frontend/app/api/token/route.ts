import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Card from '@/models/Card';

export async function GET(request: Request) {
    await connectToDatabase();

    // Récupérer le tokenId depuis l'URL
    const { searchParams } = new URL(request.url);
    const tokenId = searchParams.get('tokenId');

    try {
        if (tokenId) {
            const card = await Card.findOne({ tokenId: parseInt(tokenId) });
            if (card) {
                return NextResponse.json({ success: true, data: card });
            } else {
                return NextResponse.json(
                    { success: false, message: 'Card not found' },
                    { status: 404 }
                );
            }
        } else {
            const cards = await Card.find({});
            return NextResponse.json({ success: true, data: cards });
        }
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function POST(request: Request) {
    await connectToDatabase();

    try {
        const body = await request.json();
        const { tokenId, name, description, imageUrl, grade, attributes } = body;

        // Validation simple
        if (!tokenId || !name || !description || !imageUrl || !grade || !attributes) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const card = await Card.create({ tokenId, name, description, imageUrl, grade, attributes });
        return NextResponse.json({ success: true, data: card }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
