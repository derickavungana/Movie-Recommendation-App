// src/app/HomePageClient.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePopularMovies, useSearchMovies } from '../services/tmdbService';
// import { Movie, PaginatedResponse } from '../types';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import AuthStatus from './AuthStatus';

const HomePageClient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: popularMovies, isLoading: isPopularLoading, isError: isPopularError } =
    usePopularMovies(currentPage);

  const { data: searchResults, isLoading: isSearchLoading } =
    useSearchMovies(searchQuery, currentPage);

  const movies = (searchQuery ? searchResults?.results : popularMovies?.results) ?? [];
  const totalPages = searchQuery ? searchResults?.total_pages : popularMovies?.total_pages;
  const isLoading = searchQuery ? isSearchLoading : isPopularLoading;

  if (isLoading) {
    return <Loader />;
  }

  if (isPopularError) {
    return <p className="text-red-500 text-center">Failed to fetch movies. Please check your network connection.</p>;
  }

  return (
    <>
      <div className="flex flex-col items-center p-4">
        <div className="flex justify-between w-full max-w-lg mb-4">
          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <AuthStatus />
        </div>
        
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <div className="cursor-pointer">
                  <MovieCard movie={movie} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl mt-10">No movies found.</p>
        )}
        
        {totalPages && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default HomePageClient;