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
    ref: 'User', // Référence au modèle User
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Vous pouvez ajouter des méthodes au schéma si nécessaire
postSchema.methods.getSummary = function() {
  return this.content.substring(0, 100) + '...'; // Exemple de méthode pour obtenir un résumé du contenu
};

const Post = mongoose.model('Post', postSchema);

export default Post; 