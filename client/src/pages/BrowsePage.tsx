import React from 'react';
import NavBar from '../components/NavBar';
import BillBoard from '../components/BillBoard';
import MovieList from '../components/MovieList';
import useMoviesList from '../hooks/useMoviesList';

const BrowsePage: React.FC = () => {

    const {movies, loading, error} = useMoviesList();

    return (
        <div>
            <NavBar/>
            <BillBoard/>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movies && <MovieList movies={movies}/>}
        </div>
    );
};

export default BrowsePage;