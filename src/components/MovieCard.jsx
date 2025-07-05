import { Link } from 'react-router-dom';

function MovieCard({ movie, onRecommend }) {
  const getRatingColor = (rating) => {
    if (rating >= 8) return 'from-green-500 to-emerald-500';
    if (rating >= 6) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
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
      
      <div className="space-y-2">
        <Link
          to={`/recommendations/${movie.id}`}
          className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold"
        >
          Voir les recommandations
        </Link>
        
        {onRecommend && (
          <button
            onClick={() => onRecommend(movie.id)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold"
          >
            🎯 Recommandations rapides
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;