// Statistiques des genres avec graphique amélioré
import StatCard from "./StatCard";
export function GenreStats({ movies }) {
    const genreCounts = movies.reduce((acc, movie) => {
      movie.genres.forEach(genre => {
        acc[genre] = (acc[genre] || 0) + 1;
      });
      return acc;
    }, {});
  
    const sortedGenres = Object.entries(genreCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10); // Top 10 genres
  
    const maxCount = Math.max(...Object.values(genreCounts));
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">
              📊 Statistiques des Genres
            </h1>
            <a
              href="/movies"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl transition-colors duration-300"
            >
              ← Retour aux Films
            </a>
          </div>
  
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Top 10 des Genres</h2>
            <div className="space-y-4">
              {sortedGenres.map(([genre, count], index) => (
                <div key={genre} className="flex items-center space-x-4">
                  <div className="w-8 text-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">{genre}</span>
                      <span className="text-cyan-300 font-bold">{count} films</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${(count / maxCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Films"
              value={movies.length}
              icon="🎬"
              color="from-blue-500 to-purple-500"
            />
            <StatCard
              title="Genres Uniques"
              value={Object.keys(genreCounts).length}
              icon="🎭"
              color="from-green-500 to-teal-500"
            />
            <StatCard
              title="Note Moyenne"
              value={movies.length > 0 ? (movies.reduce((sum, m) => sum + (m.rating || 0), 0) / movies.length).toFixed(1) : '0'}
              icon="⭐"
              color="from-yellow-500 to-orange-500"
            />
          </div>
        </div>
      </div>
    );
  }