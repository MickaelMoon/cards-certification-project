import connectToDatabase from '../../lib/mongodb';
import Card from '../../models/Card';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await connectToDatabase();

    switch (method) {
        case 'GET':
            try {
                const { tokenId } = req.query;

                if (tokenId) {
                    const card = await Card.findOne({ tokenId: parseInt(tokenId as string) });
                    if (card) {
                        res.status(200).json({ success: true, data: card });
                    } else {
                        res.status(404).json({ success: false, message: 'Card not found' });
                    }
                } else {
                    const cards = await Card.find({});
                    res.status(200).json({ success: true, data: cards });
                }
            } catch (error: any) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case 'POST':
            try {
                const { tokenId, name, description, imageUrl, grade, attributes } = req.body;

                // Validation simple
                if (!tokenId || !name || !description || !imageUrl || !grade || !attributes) {
                    return res.status(400).json({ success: false, message: 'Missing required fields' });
                }

                const card = await Card.create({ tokenId, name, description, imageUrl, grade, attributes });
                res.status(201).json({ success: true, data: card });
            } catch (error: any) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}