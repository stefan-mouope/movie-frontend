import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieList from './MovieList.jsx';

function MovieListPage({ movies, error, setError, fetchMovies }) {
  useEffect(() => {
    if (typeof fetchMovies === 'function') {
      fetchMovies();
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = Array.isArray(movies)
  ? movies.filter(
      movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres.some(genre =>
          genre.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
  : [];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="container mx-auto p-6">
        {/* Header avec navigation */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            🎬 Bibliothèque Cinéma
          </h1>
          <Link
            to="/dashboard"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-colors duration-300"
          >
            ← Accueil
          </Link>
        </div>

        {/* Barre de recherche */}
        <div className="relative mb-8">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Rechercher un film ou un genre..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl text-red-200">
            {error}
          </div>
        )}

        <MovieList movies={filteredMovies} />

        <div className="mt-8 text-center">
          <Link
            to="/stats"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
          >
            📊 Voir les Statistiques
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieListPage;