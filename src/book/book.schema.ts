import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    name: String,
    isbn: String,
    author: String,
    pages: Number,
    price: Number,
    description: String,
    category: String,
    created_at: { type: Date, default: Date.now }
});
