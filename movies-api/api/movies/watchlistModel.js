import mongoose from "mongoose";
 const Schema = mongoose.Schema;

 const WatchlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
 });

 export default mongoose.model('Watchlist', WatchlistSchema);