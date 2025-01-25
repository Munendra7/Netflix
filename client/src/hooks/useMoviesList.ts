import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Movie } from '../types';

interface State {
    movies: Movie[];
    loading: boolean;
    error: string | null;
}

const initialState:State = {
    movies: [],
    loading: true,
    error: null,
};

enum Actiontype {
    Loading,
    Success,
    Error,
}

type Action = {type:Actiontype.Loading} | {type:Actiontype.Success, payload:Movie[]} | {type:Actiontype.Error, payload:string};


const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case Actiontype.Loading:
            return { ...state, loading: true, error: null };
        case Actiontype.Success:
            return { ...state, loading: false, movies: action.payload };
        case Actiontype.Error:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


const useMoviesList = () => {

    const [{ movies, loading, error }, dispatch] = useReducer(reducer, initialState);

    const fetchMovies = async () => {
        try {
            dispatch({ type: Actiontype.Loading });
            const response = await axios.get('http://localhost:8080/movies/list');
            dispatch({ type: Actiontype.Success, payload: response.data });
        } catch (err: any) {
            dispatch({ type: Actiontype.Error, payload: err.message });
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return { movies, loading, error };
};

export default useMoviesList;