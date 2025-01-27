import React, { useRef } from 'react';
import NavBar from '../components/NavBar';
import BillBoard from '../components/BillBoard';
import MovieList from '../components/MovieList';
import useMoviesList from '../hooks/useMoviesList';
import LoadingCards from '../components/LoadingCards';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const BrowsePage: React.FC = () => {

    const {user, isloading} = useSelector((state:RootState) => state.user.value);

    console.log(user, isloading);

    const [offset, setOffset] = React.useState<number>(0);
    const {movies, loading, error} = useMoviesList(offset);

    const Observer = useRef<IntersectionObserver | null>(null);

    const lastElemntRef = React.useCallback((node: HTMLDivElement) => {
        if (loading) return;
        if (Observer.current) Observer.current.disconnect();
        Observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setOffset(prev => prev + 10);
            }
        });
        if (node) Observer.current.observe(node);
    }, [loading]);

    return (
        <div>
            <NavBar/>
            <BillBoard/>
            {error && <p>{error}</p>}
            {movies && <MovieList movies={movies} lastElementRef={lastElemntRef}/>}
            {loading && <LoadingCards/>}
        </div>
    );
};

export default BrowsePage;