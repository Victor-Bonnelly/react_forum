import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment; 