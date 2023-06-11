//API key
//1301f276093fed7a6a56f2460abb9f99
const global = {
  currentPage: window.location.pathname,
};
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
      console.log('home');
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
