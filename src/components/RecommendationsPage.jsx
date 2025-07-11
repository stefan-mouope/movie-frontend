import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Recommendations from './Recommendations.jsx';

const apiUrl = import.meta.env.VITE_API_URL; // 🔥 Ajouté

function RecommendationsPage() {
  const { movieId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/recommend/${movieId}/`);
        const data = await response.json();
        if (response.ok) {
          setRecommendations(data);
          setError(null);
        } else {
          setError(data.error || 'Erreur lors du chargement des recommandations');
          setRecommendations([]);
        }
      } catch (err) {
        setError('Erreur lors du chargement des recommandations');
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [movieId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            🎯 Recommandations Personnalisées
          </h1>
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors duration-300"
          >
            ← Retour aux Films
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 animate-bounce">🎬</div>
            <p className="text-white text-xl">Chargement des recommandations...</p>
          </div>
        ) : (
          <Recommendations recommendations={recommendations} />
        )}
      </div>
    </div>
  );
}

export default RecommendationsPage;
