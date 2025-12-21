import mongoose from 'mongoose';
 const Schema = mongoose.Schema;

 const FavoriteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type: Number,
        required: true
    }
 });

 export default mongoose.model('Favorite', FavoriteSchema);