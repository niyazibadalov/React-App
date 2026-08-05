import Card from './Card';

export default function ResultsList({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="results-grid">
      {items.map((item) => (
        <Card key={item.imdbID} item={item} />
      ))}
    </div>
  );
}