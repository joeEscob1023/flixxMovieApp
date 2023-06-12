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
          alt="Movie Title"
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

//Fetch data from TMDB API
//normally you wouldn't make the API public
async function fetchAPIData(endpoint) {
  const API_KEY = '1301f276093fed7a6a56f2460abb9f99';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  return data;
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
      console.log('shows');
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
