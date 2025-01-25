import React from 'react';
import { Movie } from '../types';
import { useNavigate } from 'react-router-dom';

interface MovieListProps {
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {

    const navigate = useNavigate();

    const handlePlay = (id: number) => {
        navigate(`/browse/watch/${id}`);
    }

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Popular Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="relative cursor-pointer transform transition-all duration-500 ease-in-out hover:scale-105 hover:z-10"
                    >
                        {/* Movie Image */}
                        <div className="relative w-full h-64 md:h-72 lg:h-80">
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300 ease-in-out"
                            />

                            {/* Overlay with Title, Description, and Play Button */}
                            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-center items-center p-4">
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300 ease-in-out"
                                />
                                <button onClick={()=>{handlePlay(movie.id)}} className="text-white bg-red-600 px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition duration-200">
                                    Play
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
