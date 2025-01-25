import React from "react";
import { Movie } from "../types";
import { useNavigate } from "react-router-dom";

interface MovieListProps {
  movies: Movie[];
  lastElementRef: (node: HTMLDivElement) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, lastElementRef }) => {
  const navigate = useNavigate();

  const handlePlay = (id: number) => {
    navigate(`/browse/watch/${id}`);
  };

  return (
    <div className="mt-6 mb-6 ml-2 mr-2">
      <h2 className="text-2xl font-bold text-white mb-4">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            ref={movies.length === index + 1 ? lastElementRef : null}
            className="relative group cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10"
          >
            {/* Default Movie Image */}
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-64 md:h-72 lg:h-80 object-cover rounded-lg shadow-lg"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 flex flex-col justify-center items-center p-4 space-y-4">
              {/* Enlarged Hover Image */}
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-48 h-64 object-cover rounded-lg shadow-lg"
              />

              {/* Movie Title */}
              <h3 className="text-lg font-semibold text-white text-center">
                {movie.title}
              </h3>

              {/* Play Button */}
              <button
                onClick={() => handlePlay(movie.id)}
                className="text-white bg-red-600 px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition duration-300"
              >
                Play
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;