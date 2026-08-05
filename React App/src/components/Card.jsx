export default function Card({ item }) {
  return (
    <div className="card">
      <img
        src={item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/300x450?text=Şəkil+Yoxdur'}
        alt={item.Title}
        className="card-img"
      />
      <div className="card-body">
        <h3 className="card-title">{item.Title}</h3>
        <p className="card-year">{item.Year}</p>
        <span className="card-type">{item.Type}</span>
      </div>
    </div>
  );
}