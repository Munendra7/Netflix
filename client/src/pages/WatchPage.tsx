import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import useMovie from "../hooks/useMovie";
import { useNavigate, useParams } from "react-router-dom";

const WatchPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams() as { id: string };
  const { movie, loading, error } = useMovie(params.id);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full p-4 z-10 flex items-center gap-8 bg-black bg-opacity-80">
        <ArrowLeftIcon
          onClick={() => navigate("/browse")}
          className="w-10 text-white cursor-pointer hover:opacity-80 transition"
        />
        <p className="text-white text-3xl font-bold">
          <span className="font-light">Watching:</span> {movie?.title || "Loading..."}
        </p>
      </nav>

      {/* Content */}
      <div className="h-full w-full flex items-center justify-center">
        {loading && (
          <div className="text-white text-lg font-medium animate-pulse">
            Loading...
          </div>
        )}
        {error && (
          <div className="text-white text-lg font-medium text-center">
            {error}
          </div>
        )}
        {movie && (
          <iframe
            className="h-full w-full"
            src={movie.videoUrl}
            allow="autoplay"
          />
        )}
      </div>
    </div>
  );
};

export default WatchPage;