import React from "react";
import { getTrendingTodayMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const TrendingTodayPage = () => {

    const { data, error, isPending, isError  } = useQuery({
        queryKey: ['trending-day'],
        queryFn: getTrendingTodayMovies,    
    })

    if (isPending) {
        return <Spinner />
    }
    
    if (isError) {
        return <h1>{error.message}</h1>
    }  

    const movies = data.results;

    return (
        <PageTemplate
            title="Trending Today"
            movies={movies}
            action={(movie) => {
            //return <AddToWatchlistIcon movie={movie} />
            }}
        />
    );
};

export default TrendingTodayPage;
