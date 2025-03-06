import React, { useEffect, useState } from 'react';
import Pagination from "./Pagination";

function Favourites() {
  let [genres, setGenres] = useState([]);
  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation', 
    35: 'Comedy',
    80: 'Crime', 
    99: 'Documentary',
    18: 'Drama', 
    10751: 'Family',
    14: 'Fantasy', 
    36: 'History',
    27: 'Horror',
    10402: 'Music', 
    9648: 'Mystery', 
    10749: 'Romance', 
    878: 'Sci-Fi', 
    10770: 'TV', 
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };

  let movies = [
    {
      "adult": false,
      "backdrop_path": "/ogFIG0fNXEYRQKrpnoRJcXQNX9n.jpg",
      "id": 619930,
      "title": "Narvik",
      "original_language": "no",
      "original_title": "Kampen om Narvik",
      "overview": "April, 1940. The eyes of the world are on Narvik, a small town in northern Norway, a source of the iron ore needed for Hitler's war machine. Through two months of fierce winter warfare, the German leader is dealt with his first defeat.",
      "poster_path": "/gU4mmINWUF294Wzi8mqRvi6peMe.jpg",
      "media_type": "movie",
      "genre_ids": [10752, 18, 36, 28],
      "popularity": 321.063,
      "release_date": "2022-12-25",
      "vote_average": 7.406,
      "vote_count": 53
    },
    
    // Add more movie objects...
  ];

  // State for genres, favorite movie ids, and filtering
  const [favorites, setFavorites] = useState([]);
  const [genresList, setGenresList] = useState([]);

  // Load favorites from localStorage on page load
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);

    let tempGenres = movies.map((movie) => genreids[movie.genre_ids[0]]);
    tempGenres = new Set(tempGenres);
    setGenresList(["All Genres", ...tempGenres]);
  }, []);

  // Handle favorite button toggle
  const toggleFavorite = (movieId) => {
    let updatedFavorites;
    if (favorites.includes(movieId)) {
      updatedFavorites = favorites.filter(id => id !== movieId);
    } else {
      updatedFavorites = [...favorites, movieId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <div className="mt-6 flex space-x-2 justify-center">
        {genresList.map((genre) => (
          <button
            key={genre}
            className='py-1 px-2 bg-gray-400 rounded-lg font-bold text-lg text-white hover:bg-blue-400'>
            {genre}
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        <input type="text" placeholder='Search' className="border-2 py-1 px-2 text-center" />
        <input type="number" className="border-2 py-1 px-2 text-center" value={1} />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th className="px-6 py-4 font-medium text-gray-900">Rating</th>
              <th className="px-6 py-4 font-medium text-gray-900">Popularity</th>
              <th className="px-6 py-4 font-medium text-gray-900">Genre</th>
              <th className="px-6 py-4 font-medium text-gray-900">Favorite</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {movies.map((movie) => {
              const isFavorite = favorites.includes(movie.id);
              return (
                <tr className="hover:bg-gray-50" key={movie.id}>
                  <td className="px-6 py-4 font-normal text-gray-900 flex items-center space-x-2">
                    <img
                      className="h-[6rem] w-[10rem] object-cover"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="font-medium text-gray-700 text-sm">{movie.title || movie.name}</div>
                  </td>
                  <td className="px-6 py-4">{movie.vote_average.toFixed(2)}</td>
                  <td className="px-6 py-4">{movie.popularity.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {movie.genre_ids.map((id) => (
                      <span key={id} className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        {genreids[id]}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className={`px-4 py-2 text-xs font-semibold ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => toggleFavorite(movie.id)}
                    >
                      {isFavorite ? 'Unfavorite' : 'Favorite'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination />
    </>
  );
}

export default Favourites;
