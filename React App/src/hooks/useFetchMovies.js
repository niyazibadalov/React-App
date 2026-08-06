import { useState, useEffect } from 'react';
import { dummyMovies } from '../data/movies';

export default function useFetchMovies(debouncedSearch, currentPage, itemsPerPage) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        if (controller.signal.aborted) return;

        const filtered = dummyMovies.filter((movie) =>
          movie.Title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

        setTotalResults(filtered.length);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

        setItems(paginatedItems);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Məlumatların yüklənməsində xəta baş verdi.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [debouncedSearch, currentPage, itemsPerPage]);

  return { items, loading, error, totalResults };
}