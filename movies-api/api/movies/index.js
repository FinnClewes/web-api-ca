import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovie, getMovies, getUpcomingMovies } from '../tmdb-api'; 
import authenticate from '../../authenticate';
import Favorite from './favoriteModel';
import Watchlist from './watchlistModel';

const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/favorites', authenticate, asyncHandler(async (req, res) => {
    console.log('HIT /favorites for user', req.user._id);

    const favorites = await Favorite.find({ userId: req.user._id });
    res.status(200).json(favorites);
}));

router.post('/favorites', authenticate, asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    const existing = await Favorite.findOne({ userId: req.user._id, movieId });

    if (!existing) {
        const fav = await Favorite.create({ userId: req.user._id, movieId });
        res.status(201).json(fav);
    }

    res.status(200).json(existing);
}));

router.delete('/favorites/:movieId', authenticate, asyncHandler(async (req, res) => {
    await Favorite.deleteOne({ userId: req.user._id, movieId: Number(req.params.movieId) });
    res.status(204).end();
}));

router.get('/watchlist', asyncHandler(async (req, res) => {
    const watchlists = await Watchlist.find({ userId: `${req.user._id}`});
res.status(200).json(watchlists);
}));

router.post('/watchlist', authenticate, asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    const existing = await Watchlist.findOne({ userId: req.user._id, movieId });

    if (!existing) {
        const fav = await Watchlist.create({ userId: req.user._id, movieId });
        res.status(201).json(fav);
    }

    res.status(200).json(existing);
}));

router.delete('/watchlist/:movieId', authenticate, asyncHandler(async (req, res) => {
    await Watchlist.deleteOne({ userId: req.user._id, movieId: Number(req.params.movieId) });
    res.status(204).end();
}));

// Not functional
router.get('/movie/:id', asyncHandler(async (req, res) => {
    const movie = await getMovie(req.params.id);
    res.status(200).json(movie);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies(req.params.id);
    res.status(200).json(upcomingMovies);
}));

export default router;
