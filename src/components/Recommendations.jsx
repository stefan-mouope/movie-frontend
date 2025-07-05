function Recommendations({ recommendations }) {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🤔</div>
        <p className="text-gray-300 text-xl">Aucune recommandation disponible</p>
        <p className="text-gray-400 mt-2">Essayez d'ajouter plus de films à votre collection</p>
      </div>
    );
  }

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'from-green-500 to-emerald-500';
    if (rating >= 6) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Films recommandés pour vous
        </h2>
        <p className="text-gray-300">
          Basé sur vos préférences et les genres que vous aimez
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((movie, index) => (
          <div
            key={movie.id || index}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors duration-300">
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
                {movie.genres?.map((genre, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-pink-600/50 text-pink-200 rounded-full text-sm border border-pink-400/30"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">
                  Recommandé #{index + 1}
                </span>
                <div className="flex items-center text-pink-300">
                  <span className="text-sm">Pertinence</span>
                  <div className="ml-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xs ${i < 4 ? 'text-pink-400' : 'text-gray-600'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            💡 Astuce
          </h3>
          <p className="text-gray-300">
            Plus vous ajoutez de films avec des notes, plus nos recommandations seront précises !
          </p>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;