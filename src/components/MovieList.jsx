import { Link } from 'react-router-dom';

function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎭</div>
        <p className="text-gray-400 text-xl">Aucun film trouvé</p>
      </div>
    );
  }

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'from-green-500 to-emerald-500';
    if (rating >= 6) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map(movie => (
        <Link
          key={movie.id}
          to={`/recommendations/${movie.id}`}
          className="group block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
              {movie.title}
            </h3>
            {movie.rating && (
              <div className={`px-3 py-1 rounded-full text-white font-semibold text-sm bg-gradient-to-r ${getRatingColor(movie.rating)}`}>
                ⭐ {movie.rating.toFixed(1)}
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-600/50 text-purple-200 rounded-full text-sm border border-purple-400/30"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
            Cliquez pour voir les recommandations →
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MovieList;