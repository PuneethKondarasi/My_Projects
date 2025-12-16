import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResultsContainer from '../components/ResultsContainer';
import LoadingSpinner from '../components/LoadingSpinner';

function Results() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  const [results, setResults] = useState({ books: [], videos: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);

    // Fetch results using the correct endpoint
    const fetchResults = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/search/all?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Failed to fetch search results', error);
        setResults({ books: [], videos: [] });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Results for <span className="text-gradient">"{query}"</span>
          </h1>
          {!isLoading && (
            <p className="text-muted-foreground">
              Found {results.books?.length + results.videos?.length} learning resources tailored for you
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <ResultsContainer results={results} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}

export default Results;
