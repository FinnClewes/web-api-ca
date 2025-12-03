import React, { useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToWatchlistIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleAddToWatchlist = (e) => {
        e.preventDefault();
        context.addToWatchlist(movie);
    }

    return (
        <IconButton aria-label="add to watchlist" onClick={handleAddToWatchlist}>
            <PlaylistAddIcon sx={{color: "#3f5737"}} fontSize="large" />
        </IconButton>
    )
}

export default AddToWatchlistIcon;