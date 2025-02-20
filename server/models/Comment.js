import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    createdAt: { type: Date, default: Date.now },
    rating: { type: Number, min: 1, max: 5 } 
});

export const CommentModel = mongoose.model('Comment', commentSchema);
