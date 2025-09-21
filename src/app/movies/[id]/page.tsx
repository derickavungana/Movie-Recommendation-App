'use client';

import { useParams } from 'next/navigation';
import { useMovieDetails } from '../../../services/tmdbService';
import Loader from '../../../components/Loader';

const MovieDetailsPage = () => {
  const params = useParams();
  const movieId = params.id as string;

  const { data: movie, isLoading, isError } = useMovieDetails(movieId);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !movie) {
    return <div className="text-center p-8">Movie not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <div className="flex flex-col md:flex-row items-start">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-1">
          <p className="text-lg mb-4">{movie.overview}</p>
          <p className="mb-2"><strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10</p>
          <p className="mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
          <h3 className="text-xl font-semibold mt-4">Cast</h3>
          {movie.credits?.cast?.slice(0, 5).map((member: any) => (
            <p key={member.id}>{member.name} as {member.character}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;