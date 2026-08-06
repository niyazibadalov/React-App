import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Pagination from './components/Pagination';
import useFetchMovies from './hooks/useFetchMovies';
import './App.css';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { items, loading, error, totalResults } = useFetchMovies(
    debouncedSearch,
    currentPage,
    ITEMS_PER_PAGE
  );

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

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