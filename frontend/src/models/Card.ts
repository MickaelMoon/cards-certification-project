import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    tokenId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    grade: { type: Number, required: true },
    attributes: []
});

export default mongoose.models.Card || mongoose.model('Card', CardSchema, 'cards');