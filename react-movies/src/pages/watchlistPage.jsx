import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import WriteReview from "../components/cardIcons/writeReview";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist.jsx";


const WatchlistPage = () => {
  const {watchlist: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const watchlistQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });
  
  // Check if any of the parallel queries is still loading.
  const isPending = watchlistQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = watchlistQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Watchlist"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchlist movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );

};

export default WatchlistPage;
