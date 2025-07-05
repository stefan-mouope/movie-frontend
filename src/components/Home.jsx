import { Link } from 'react-router-dom';
import AddMovieForm from './AddMovieForm.jsx';

function Home({ onAddMovie, error }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Effets de fond animés */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CinéMagic
            </h1>
            <p className="text-white/80 text-lg">Découvrez vos prochains films préférés</p>
          </div>
          
          <AddMovieForm onAddMovie={onAddMovie} />
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-400/50 rounded-xl text-red-200">
              {error}
            </div>
          )}
          
          <div className="mt-6 space-y-3">
            <Link
              to="/movies"
              className="block w-full p-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 text-center"
            >
              <span className="mr-2">🎬</span>
              Explorer les Films
            </Link>
            <Link
              to="/stats"
              className="block w-full p-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 text-center"
            >
              <span className="mr-2">📊</span>
              Statistiques des Genres
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;