// src/components/MovieCard.tsx
import React from 'react';
import Image from 'next/image';

interface MovieCardProps {
  movie: {
    title: string;
    poster_path: string | null;
    vote_average: number;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750/000000/FFFFFF?text=No+Image';

  const voteAverage = movie.vote_average.toFixed(1);

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
      <Image
        src={imageUrl}
        alt={movie.title}
        width={500}
        height={750}
        className="w-full h-auto object-cover"
        // Add the unoptimized property here
        unoptimized={true} 
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/500x750/000000/FFFFFF?text=No+Image';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent p-4 flex items-end">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white truncate">{movie.title}</h3>
          <p className="text-sm text-gray-300 mt-1">Rating: {voteAverage}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;