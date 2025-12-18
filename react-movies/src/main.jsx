import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import WatchlistPage from "./pages/watchlistPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingTodayPage from "./pages/trendingTodayPage";
import TrendingThisWeekPage from "./pages/trendingThisWeekPage";
//import TrendingThisMonthPage from "./pages/trendingThisMonthPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import TopRatedPage from "./pages/topRatedPage";
import SiteHeader from './components/siteHeader';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signupPage";
import StartPage from "./pages/startPage";
import ProfilePage from "./pages/profilePage";
import AuthContextProvider from "./contexts/authContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <AuthContextProvider>
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/trending/today" element={<TrendingTodayPage />}></Route>
            <Route path="/movies/trending/this-week" element={<TrendingThisWeekPage />}></Route>
            {/* <Route path="/movies/trending/this-month" element={<TrendingThisMonthPage />}></Route> */}
            <Route path="/movies/now-playing" element={<NowPlayingPage />}></Route>
            <Route path="/movies/top-rated" element={<TopRatedPage />}></Route>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/watchlist" element={<WatchlistPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/login" element={< LoginPage />} />
            <Route path="/signup" element={< SignUpPage />} />
            <Route path="/profile" element={< ProfilePage />} />
            <Route path="/discover" element={< HomePage />} />
            <Route path="/" element={<StartPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);
