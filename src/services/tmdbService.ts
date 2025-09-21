import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { PaginatedResponse, Movie } from '../types'; // Import the types

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

// Helper function to fetch data from TMDB
const fetcher = async (url: string) => {
  const { data } = await axios.get(url, {
    params: {
      api_key: TMDB_API_KEY,
    },
  });
  return data;
};

// Functions to fetch specific movie data
const fetchPopularMovies = (page: number) => {
  return fetcher(`${API_URL}/movie/popular?page=${page}`);
};

const searchMovies = (query: string, page: number) => {
  return fetcher(`${API_URL}/search/movie?query=${query}&page=${page}`);
};

const fetchMovieDetails = (movieId: string) => {
  return fetcher(`${API_URL}/movie/${movieId}?append_to_response=credits`);
};

// React Query hooks with the new object-based syntax
export const usePopularMovies = (page: number) => {
  return useQuery<PaginatedResponse>({
    queryKey: ['popularMovies', page],
    queryFn: () => fetchPopularMovies(page),
    placeholderData: (previousData) => previousData, // Use the correct property
  });
};

export const useSearchMovies = (query: string, page: number) => {
  return useQuery<PaginatedResponse>({
    queryKey: ['searchMovies', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: !!query,
    placeholderData: (previousData) => previousData, // Also update this one
  });
};

export const useMovieDetails = (movieId: string) => {
  // Assuming a different type for movie details
  return useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => fetchMovieDetails(movieId),
    enabled: !!movieId,
  });
};

// Re-export the types you need
export type { Movie, PaginatedResponse };