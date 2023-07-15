import { API_KEY } from '/key.js'; //Getting the API key from 'key.js' that is ignored

const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;
const search = document.getElementById('search');
const main = document.getElementById('main');

getMovies(API_URL);

const form = document.getElementById('form');

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

form.addEventListener('submit', (e) => {
  //The form is submitted by hitting the 'enter' key
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && search !== '') {
    getMovies(SEARCH_API + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});

function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${
            vote_average >= 8 ? 'green' : vote_average >= 6 ? 'orange' : 'red' //Controling the apperance of the rating
          }">${vote_average.toFixed(1)}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      `;
    main.appendChild(movieEl);
  });
}
