const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    
          <a href="movie-details.html?id=${movie.id}">
           ${
             movie.poster_path
               ? ` <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
               : ` <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
           }
          </a>
          <div class="card-body">
            <h5 class="card-title"${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_data}</small>
            </p>
          </div>
        
    `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}
//Display popular tv shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    
          <a href="tv-details.html?id=${show.id}">
           ${
             show.poster_path
               ? ` <img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`
               : ` <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
           }
          </a>
          <div class="card-body">
            <h5 class="card-title"${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        
    `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

//Fetch data from TMDB API
//normally you wouldn't make the API public
async function fetchAPIData(endpoint) {
  const API_KEY = '1301f276093fed7a6a56f2460abb9f99';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

//Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute(`href`) === global.currentPage) {
      link.classList.add('active');
    }
  });
}

//Init App
function init() {
  //Have to add this variable because I messed up by putting the flixx-app-theme inside another folder instead of making it the root folder. I already have it git and I dont want to mess up the app and start all over again. I probably could fix it, but its not really important right now.
  const root = '/flixx-app-theme';
  switch (global.currentPage) {
    case `${root}/index.html`:
      displayPopularMovies();
      break;
    case `${root}/shows.html`:
      displayPopularShows();
      break;
    case `${root}/movie-details.html`:
      console.log('movie details');
      break;
    case `${root}/tv-details.html`:
      console.log('tv details');
      break;
    case `${root}/search.index`:
      console.log('search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
