import React from "react";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const NowPlayingPage = () => {
    
    const { data, error, isPending, isError  } = useQuery({
        queryKey: ['now-playing'],
        queryFn: getNowPlayingMovies,    
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
            title="Now Playing Movies"
            movies={movies}
            action={(movie) => {
            }}
        />
    );
};
    
export default NowPlayingPage;
