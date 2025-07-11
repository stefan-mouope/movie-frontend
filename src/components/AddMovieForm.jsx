import { useState } from 'react';

function AddMovieForm({ onAddMovie }) {
  const [newMovie, setNewMovie] = useState({ title: '', genres: [], rating: '' });
  const [currentGenre, setCurrentGenre] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await onAddMovie ? onAddMovie(newMovie) : true;
    if (success) {
      setNewMovie({ title: '', genres: [], rating: '' });
      setCurrentGenre('');
    }
    setIsSubmitting(false);
  };

  const addGenre = () => {
    if (currentGenre.trim() && !newMovie.genres.includes(currentGenre.trim())) {
      setNewMovie({ 
        ...newMovie, 
        genres: [...newMovie.genres, currentGenre.trim()] 
      });
      setCurrentGenre('');
    }
  };

  const removeGenre = (indexToRemove) => {
    setNewMovie({
      ...newMovie,
      genres: newMovie.genres.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleGenreKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addGenre();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
            🎭
          </span>
          <input
            type="text"
            placeholder="Titre du film"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
                🎪
              </span>
              <input
                type="text"
                placeholder="Ajouter un genre"
                value={currentGenre}
                onChange={(e) => setCurrentGenre(e.target.value)}
                onKeyPress={handleGenreKeyPress}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <button
              type="button"
              onClick={addGenre}
              disabled={!currentGenre.trim()}
              className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              ➕
            </button>
          </div>
          
          {newMovie.genres.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="text-white/80 text-sm font-medium mb-3">Genres ajoutés:</h4>
              <div className="flex flex-wrap gap-2">
                {newMovie.genres.map((genre, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg px-3 py-1.5 text-white text-sm"
                  >
                    <span>{genre}</span>
                    <button
                      type="button"
                      onClick={() => removeGenre(index)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200 text-lg leading-none"
                      title="Supprimer ce genre"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
            ⭐
          </span>
          <input
            type="number"
            placeholder="Note (0-10)"
            value={newMovie.rating}
            onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            step="0.1"
            min="0"
            max="10"
            required
          />
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || newMovie.genres.length === 0}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
      >
        {isSubmitting ? '🎬 Ajout en cours...' : '✨ Ajouter le Film'}
      </button>
    </div>
  );
}

export default AddMovieForm;