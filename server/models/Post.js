import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


postSchema.methods.getSummary = function() {
  return this.content.substring(0, 100) + '...'; 
};

const Post = mongoose.model('Post', postSchema);

export default Post; 