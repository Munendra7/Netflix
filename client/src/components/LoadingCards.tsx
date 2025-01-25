import React from "react";

const LoadingCards: React.FC = () => {
  const skeletonCards = Array.from({ length: 12 }); // Generate 12 placeholders

  return (
    <div className="mt-6 mb-6 ml-2 mr-2">
      <h2 className="text-2xl font-bold text-white mb-4">Loading...</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="relative w-full h-64 md:h-72 lg:h-80 bg-gray-800 rounded-lg shadow-lg animate-pulse"
          >
            <div className="absolute inset-0 bg-gray-700 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingCards;