import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Pagination from './components/Pagination';
import { dummyMovies } from './data/movies';
import './App.css';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
  }, [debouncedSearch, currentPage]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredTotal = dummyMovies.filter((movie) =>
    movie.Title.toLowerCase().includes(debouncedSearch.toLowerCase())
  ).length;

  const totalPages = Math.ceil(filteredTotal / ITEMS_PER_PAGE);

  return (
    <div className="app-container">
      <header className="header">
        <h1>OMDb Movie Search</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
      </header>
      <main className="main-content">
        {loading && <div className="status-message">Yüklənir...</div>}

        {!loading && error && <div className="status-message error">{error}</div>}

        {!loading && !error && items.length === 0 && (
          <div className="status-message empty">Heç bir film tapılmadı.</div>
        )}

        {!loading && !error && items.length > 0 && (
          <>
            <ResultsList items={items} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}