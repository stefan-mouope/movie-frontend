import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import MovieListPage from './components/MovieListPage.jsx';
import RecommendationsPage from './components/RecommendationsPage.jsx';
import { GenreStats } from './components/GenreStats.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// 💡 On récupère l'URL de l'API depuis .env
const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('access')) {
      fetchMovies();
    }
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/movies/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      const data = await response.json();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des films');
    }
  };

  const handleAddMovie = async (newMovie) => {
    try {
      const genresArray = newMovie.genres.split(',').map(g => g.trim());
      const response = await fetch(`${apiUrl}/api/movies/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify({
          id: newMovie.id || null,
          title: newMovie.title,
          genres: genresArray,
          rating: parseFloat(newMovie.rating) || null,
        }),
      });
      if (response.ok) {
        fetchMovies();
        setError(null);
        return true;
      } else {
        const data = await response.json();
        setError(data.errors || 'Erreur lors de l\'ajout du film');
        return false;
      }
    } catch (err) {
      setError('Erreur lors de l\'ajout du film');
      return false;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Home onAddMovie={handleAddMovie} error={error} />
            </PrivateRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <MovieListPage
                movies={movies}
                error={error}
                setError={setError}
                fetchMovies={fetchMovies}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/recommendations/:movieId"
          element={
            <PrivateRoute>
              <RecommendationsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <PrivateRoute>
              <GenreStats movies={movies} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
